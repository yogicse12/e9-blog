---
title: Vue 3 - Optimization via Cached Handlers
description: "Markdown post content stress test. See how your post content is being styled with Tailwind CSS."
date: 2019-06-29
image: ../images/cached-handlers.png
author: sharvilak-thakore
---

As Vue's upcoming major release is getting nearer (scheduled in August), let's take a look at one of its most interesting optimizations done in the Compiler & Renderer API - **Caching of Handlers** :bulb:

If you are familiar with React's `useCallback()` hook, you can compare this feature exactly to what it does, but **without any need of explicitly specifying useCallback!**

## AST Output without caching handlers

Let's first understand how it would have generated the AST with treating the event handler as a normal Prop and without caching, with below example.

```html
<button type="button" id="btnIncrement" @click="increment">
   Increment
</button>
```

Look at the above code within template. Let's analyse how it would be compiled into its [AST](https://vue-next-template-explorer.netlify.app/).

```js
export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("button", {
    type: "button",
    id: "btnIncrement",
    onClick: _ctx.increment
  }, "Increment", 8 /* PROPS */, ["onClick"]))
}
```

Let's understand what's going on here :eyes:

Here `type` and `id` are hardcoded or static. So, Vue doesn't need to add them to the patch-flag array. 

However `onClick` has been bound to a reference of the handler, so in AST it gets added to the patch-flag array to be checked for any changes. So **every time this node is diffed or patched, Vue will check if there are any changes** in `onClick` and re-render if any. But in most cases you never really intend to change the event listener, isn't it? :thinking:

## How Vue 3 caches the handlers

To overcome this problem, Vue 3 compiler has a mechanism which **caches the handlers on first render and stores it as an inline function and on any subsequent render, it takes it directly from cache**. Let's take a look at the AST with cache handler.

```js
export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("button", {
    type: "button",
    id: "btnIncrement",
    onClick: _cache[1] || (
     _cache[1] = ($event, ...args) => (_ctx.increment($event, ...args))
    )
  }, "Increment"))
}
```

First, it calls the `_ctx.increment` in an inline function which is stored within the cache and then on every subsequent render, it would use the value from `_cache[1]`. Also, `_ctx.increment` will always refer to the latest version of increment().

Now `onClick` isn't required to be put into the patch-flag array. This reduces the overhead of checking the whole node for any changes and saves a lot of re-rendering since `type` and `id` are static and `onClick` is cached. You can imagine, how much re-rendering it can prevent from cascading in the case of a big component tree :tada: :rocket:

## Comparison with useCallback() of React

React 16.8.0 introduced hooks and one of them `useCallback` allowed developers to memoize the functions or methods explicitly by passing them to useCallback() and avoid re-initialising the same methods during any subsequent render. 

```js
const increment = useCallback(() => {
   // ... do something
});
```

Vue 3.0 follows a similar pattern but without the need of explicitly specifying `useCallback` and does it under the hood.

```js
onClick: _cache[1] || (
   _cache[1] = ($event, ...args) => (_ctx.increment($event, ...args)
)
```

That's a wrap ! 🎬
