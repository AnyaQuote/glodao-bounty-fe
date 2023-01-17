<template>
  <div class="markdown-container" :style="$vuetify.theme.dark ? 'color: white' : 'color:black'">
    <main :class="$vuetify.breakpoint.mdAndUp ? 'markdown-wrapper-desktop' : 'markdown-wrapper-mobile'">
      <div id="markdown-aside" class="pt-5 markdown-sticky mt-3" v-show="$vuetify.breakpoint.mdAndUp"></div>
      <div id="markdown-content"></div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
  },
  watch: {
    async description(description) {
      if (!this.description) return
      await this.init()
    },
  },
  computed: {
    headerHeight() {
      return this.$vuetify.breakpoint.width < 1050 ? 66 : 92
    },
  },
  methods: {
    // async fetchAndParseMarkdown() {
    //   const data = this.description
    //   const htmlFromMarkdown = marked(data)
    //   return htmlFromMarkdown
    // },
    getIndent(depth) {
      if (depth === '2') {
        return 'pl-2'
      } else if (depth === '3') {
        return 'pl-3'
      }
      return ''
    },
    generateLinkMarkup($headings) {
      const parsedHeadings = $headings.map((heading) => {
        return {
          title: heading.innerText,
          depth: heading.nodeName.replace(/\D/g, ''),
          id: heading.getAttribute('id'),
        }
      })
      const htmlMarkup = parsedHeadings.map(
        (h) =>
          `
          <li class="${this.getIndent(h.depth) + ' custom-link-item'}">
          	<a headingTag="#${h.id}">${h.title}</a>
          </li>
          `
      )
      const finalMarkup = `
		<ul class="markdown-ul">${htmlMarkup.join('')}</ul>
	`
      return finalMarkup
    },
    updateLinks(visibleId, $links) {
      $links.map((link) => {
        let headingTag = link.getAttribute('headingTag')
        link.classList.remove('markdown-is-active')
        if (headingTag === `#${visibleId}`) link.classList.add('markdown-is-active')
      })
    },
    async init() {
      // Part 1
      const $main = document.querySelector('#markdown-content')
      const $aside = document.querySelector('#markdown-aside')
      let id = 0
      $main.innerHTML = this.description
      $main.querySelectorAll('h1, h2, h3').forEach((el) => {
        el.setAttribute('id', id++)
      })
      // Part 2
      const $headings = [...$main.querySelectorAll('h1, h2, h3')]
      const linkHtml = this.generateLinkMarkup($headings)
      $aside.innerHTML = linkHtml
      const $links = [...$aside.querySelectorAll('a')]
      $links.forEach((link) => {
        link.addEventListener('click', () => {
          $headings.forEach((heading) => {
            if (`#${heading.id}` === link.getAttribute('headingTag')) {
              heading.scrollIntoView()
              if (!(window.innerHeight + window.scrollY >= document.body.offsetHeight))
                window.scrollTo({
                  top: window.scrollY - this.headerHeight,
                })
            }
          })
        })
      })
      document.addEventListener('scroll', () => {
        this.onScroll($headings, $links)
      })
    },

    onScroll($headings, $links) {
      if (!$headings || !$headings.length || !$links) return
      if ($headings[0].getBoundingClientRect().top >= 100) this.updateLinks('#', $links)
      $headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 100 && heading.getBoundingClientRect().top > 0)
          this.updateLinks(heading.id, $links)
      })
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)
        this.updateLinks($headings[$headings.length - 1].id, $links)
    },
  },

  mounted() {
    if (this.description) this.init()
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  },
}
</script>
<style lang="scss">
#markdown-aside {
  grid-area: aside;
}
#markdown-content {
  grid-area: content;
  overflow-x: hidden;
  overflow-wrap: break-word;
  /* white-space: pre-wrap !important; */
}
#markdown-content ::v-deep pre code.language-sh {
  white-space: pre-wrap !important;
}
#markdown-aside ::v-deep .custom-link-item {
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: white !important;
  }
}
.custom-link-item {
  line-height: 35px;
}
#markdown-content p {
  max-width: 100% !important;
  overflow-x: hidden;
}
/* p {
  line-height: 200% !important;
} */
#markdown-content p img {
  max-width: 100% !important;
  margin: 10px 0;
}
#markdown-content ul li {
  line-height: 3;
  font-size: 16px !important;
}
#markdown-content p {
  font-size: 16px !important;
  margin-bottom: 0;
  line-height: 2;
}
#markdown-content h1 {
  padding-bottom: 15px;
  color: var(--v-bluePrimary-base); //TODO: check real md
}
#markdown-content h2 {
  color: var(--v-bluePrimary-base);
}
#markdown-content h1:not(:first-child) {
  padding-top: 15px;
}
.custom-link-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.custom-link-item .markdown-is-active {
  color: var(--v-bluePrimary-base) !important;
  font-weight: 700 !important;
}
.custom-link-item a:not(.markdown-is-active) {
  color: var(--v-neutral10--base) !important;
  font-size: 16px;
  font-weight: 600 !important;
}

//

//markdown
.markdown-container {
  display: flex;
  margin: auto;
  background-color: transparent;
  /* font-family: 'Cabin', sans-serif; */
  font-weight: 400;
  line-height: 1.65;
  color: white;
  font-size: 14px;
  text-align: left;
  padding: 0;
}

#markdown-content {
  overflow-x: auto;
}
.markdown-li a {
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
}
.markdown-ul {
  padding-left: 0 !important;
  list-style-type: none !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis !important;
}
.markdown-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
}
#markdown-aside {
  padding: 0 !important;
}

.markdown-wrapper-desktop {
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'aside content';
  grid-template-columns: 150px 1fr;
  grid-gap: 20px;
  align-items: flex-start;
}
.markdown-wrapper-mobile {
  margin: 0 auto;
  align-items: flex-start;
  overflow-x: auto;
}
.markdown-is-active {
  font-weight: 600;
  font-size: 20px !important;
}
</style>
