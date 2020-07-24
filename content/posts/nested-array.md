---
title: Rendering a nested array recursively in Vue
description: We demonstrate how you can render a recursive loop with unknown
  depth in Vue. Have you ever wondered how you can iterate over an array through
  template based syntax ?
date: 2019-07-16T18:30:00.000Z
image: ../images/nested-array.jpeg
author: sharvilak-thakore
---
This is a post I've made for Vue developers on how to render your elements especially when you are unsure on how many total iterations or levels exist within an array (in simple words: when **depth of nested array is unknown**).

## How do we handle nested iteration ?

First thing which comes to everyone's mind...Recursion! But how do we implement recursion in Vue templates ?

Let's take an example to **iterate over the list of replies a comment has received, in a recursive linked list fashion.**

**Using `<template>` syntax, we can achieve recursion by using the same component again within the component**.

After compilation, under the hood Vue will recursively call *Comment* component's [render function](https://vuejs.org/v2/guide/render-function.html) until the base case is met (when no replies any more) and compile the whole tree to build [VNodes](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments). 

Let's analyse a general schema of any post. Also for simplicity let's assume that a comment and a reply have the same structure.

```json
{
    "Author": "John Doe",
    "Id": 1,
    "Title": "This is our first post",
    "Body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    "Comments": [
        {
           "UserId": "7",
           "Body": "Great post! Loved it! 💜",
           "Comments": [
             {
                "UserId": "13",
                "Body": "Really appreciate that! Thank you 😃",
                "Comments": [
                   {
                      ... // more nested replies in the form of comments
                   } 
                ]
             }   
           ]
        },
        {
           "UserId": "21",
           "Body": "Awesome! 👏 Could you please share the details about this ?",
           "Comments": [
             {
                "UserId": "13",
                "Body": "Thanks Max. I have sent a DM to you.",
                "Comments": [
                   {
                      ... // more nested replies in the form of comments
                   } 
                ]
             }   
           ]
        },
        {
           ... // more comments with replies and so on
        }
   ]
}
```


## Programming Part

Let's begin with how our components should be.

We will need mainly two components.

* ***Post*** : This component will be responsible for displaying all information in a post.

* ***Comment*** : This component will be responsible for displaying all information in a comment. We have to implement our logic of rendering the replies in a **recursive way**.

And yes ***App.vue*** of course!

### Let's code :computer:

**Post.vue**
```vue
<template>
    <div>
        <div class="post">
            <div class="d-flex align-items-center">
                <Avatar size="40" :text="post.Author" class="mr-3"></Avatar>
                <h4>{{ post.Title }}</h4>
            </div>
            <div class="post-summary">
                <div class="d-flex align-items-center pb-2 mb-2">
                    <i class="material-icons mr-1">thumb_up_alt</i> {{ post.Likes }}
                    <i class="material-icons ml-2 mr-1">comment</i> {{ post.Comments ? post.Comments.length : 0 }}
                </div>
                <a v-if="post.Comments" @click="$set(post,'expanded', true)" class="mt-2" :class="{'d-none': post.expanded}">
                    View Comments:
                </a>
                <div v-if="post.expanded">
                    <Comment v-for="(c, key) in post.Comments" :comment="c" :key="key"></Comment>
                </div>
            </div>
        </div>
    </div>
</template>
```

This will display all information of the post related to Title, Author, Likes and any direct comments received on the post.

**Comment.vue**
```vue
<template>
    <div class="comment">
        <div class="d-flex align-items-center">
            <Avatar :text="comment.User" size="30"></Avatar>
            <div class="ml-2">
                <strong>{{ comment.User }}</strong>
                <p>{{ comment.Body }}</p>
            </div>
        </div>
        <a class="d-flex align-items-center text-muted ml-1" @click="$set(comment, 'expanded', true)"
            v-if="comment.Comments && !comment.expanded">
            <i class="material-icons">subdirectory_arrow_right</i> {{ comment.Comments.length }} replies:
        </a>
        <div v-if="comment.Comments && comment.expanded">
            <Comment v-for="(c, key) in comment.Comments" :comment="c" :key="key"></Comment>
        </div>
    </div>
</template>
```

This component will display the details about the current comment and **render its children (any further replies) if any** and this will go on till there are no more children. 

**This is how recursion works in Vue templates! Simple, isn't it ?** :information_desk_person:

## Demistifying what each component did after compilation :eyes:

**Post.vue**

Vue will create virtual nodes for *Post* component and loop through the direct comments (first level) in the post with *Comment* component. 

```js
render(h) {
    return h('div', [
        h('div', { class: 'post' },
            [
                h('div', { class: 'd-flex align-items-center' },
                    [
                        h(Avatar, {
                            props: {
                                size: '40',
                                text: this.post.Author,
                            },
                            class: 'mr-3',
                        }), h('h4', this.post.Title)
                    ]
                ),
                h('div', { class: 'post-summary'},
                    [
                        h('div', { class: 'd-flex align-items-center pb-2 mb-2'},
                            [
                                h('i', { class: 'material-icons mr-1' }, 'thumb_up_alt'),
                                this.post.Likes,
                                h('i', { class: 'material-icons ml-2 mr-1' }, 'comment'),
                                this.post.Comments ? this.post.Comments.length : 0]
                        ),
                        this.post.Comments ? [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.$set(this.post,'expanded', true);
                                    }
                                },
                                class: ['mt-2', {
                                    'd-none': this.post.expanded,
                                }],
                            }, 'View Comments:'),
                            this.post.expanded ? (h('div', {
                                class: 'mt-2'
                            }, [
                                this.post.Comments.map(comment => h(Comment, {
                                    props: {
                                        comment
                                    }
                                })
                                )
                            ])): null
                        ]: null
                    ]
                )
            ]
        )
    ]);
}
```
**Comment.vue**

If a comment has further more comments (in terms of replies), it loops through the same with **Comment** component by iterating over `comment.Comments`. 

```js
render(h) {
    return h('div',{ class: 'comment' }, 
        [
            h('div', { class: 'd-flex align-items-center' }, 
                [
                    h(Avatar, {
                        props: {
                            text: this.comment.User,
                            size: '30'
                        }
                    }),
                    h('div', { class: 'ml-2' }, 
                        [ 
                            h('strong', this.comment.User), 
                            h('p', this.comment.Body)
                        ]
                    )
                ]),
            this.comment.Comments && !this.comment.expanded ? 
                h('a', { 
                    class: 'd-flex align-items-center text-muted ml-1',
                    on: {
                        click: () => {
                            this.$set(this.comment, 'expanded', true);
                        }
                    }
                }, 
                [
                    h('i', { class: 'material-icons' }, 'subdirectory_arrow_right'),
                    this.comment.Comments.length + ' replies'
                ]
                ) : null,
            this.comment.Comments && this.comment.expanded ? 
            this.comment.Comments.map((c, key) => {
                return h(Comment, {
                    key,
                    props: {
                        comment: c
                    },
                });
            }): null
        ]
    );
}
```

That's a wrap ! :clapper:

## Conclusion

Recursion is easy. Using the same component with different props within the component is the way to achieve recursion in Vue.

I have created a [GitHub repository](https://github.com/sharvilak11/dynamic-vue-array-iteration-example) for the same. Code prior to compilation is written as comments in `<template>` tag and compiled code is written in simple JS under *render()* hook. 
