// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'e9 Blog',
  siteDescription: 'We\'re the technology team at e9, through the medium of the blog, we keep our customers and surrounding audience up to date with how we build, scale, and operate our platform and teams.',
  templates: {
    Post: '/blog/:title',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          author: 'Author'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/authors/**/*.md',
        typeName: 'Author',
      }
    }
  ],
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}
