import { createController } from 'remix/router'

import { assets } from '../assets.ts'
import { routes } from '../routes.ts'
import { HomePage } from './home-page.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
    },
    home(context) {
      return context.render(<HomePage />)
    },
    // A page about the size of a long listing, 100 KB of HTML
    list() {
      let items = Array.from({ length: 2500 }, (_, i) => `<li><a href="/item/${i}">Item ${i}</a></li>`)
      return new Response(`<!doctype html><html><body><ul>${items.join('')}</ul></body></html>`, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    },
  },
})
