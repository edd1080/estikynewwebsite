import { useEffect } from 'react'
import { config } from './config'

export function useSeo(title: string, description: string, path: string, noindex = false) {
  useEffect(() => {
    const full = title.includes('Estiky') ? title : `${title} · Estiky`
    document.title = full
    const set = (sel: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }
    set('meta[name="description"]', 'name', 'description', description)
    set('meta[property="og:title"]', 'property', 'og:title', full)
    set('meta[property="og:description"]', 'property', 'og:description', description)
    set('meta[property="og:url"]', 'property', 'og:url', config.siteUrl + path)
    set('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = config.siteUrl + path
  }, [title, description, path, noindex])
}
