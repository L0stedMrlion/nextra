/* eslint-env node */
import { SwrIcon } from '@app/_icons'
import type { Metadata } from 'next'
import {
  Banner,
  Head,
  Layout,
  LocaleSwitch,
  Navbar,
  SkipNavLink
} from 'nextra-theme-docs'
import { getDictionary, getDirection } from '../_dictionaries/get-dictionary'
import './styles.css'
import '../_components/features.css'

export const { viewport } = Head

export const metadata: Metadata = {
  description:
    'SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.'
}

export default async function RootLayout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang)

  const { pageMap } = await import(
    `.next/static/chunks/nextra-page-map-${lang}.mjs`
  )

  return (
    <html
      // need to set true RTL language
      lang={lang === 'es' ? 'he' : lang}
      dir={getDirection(lang)}
    >
      <Head />
      <body>
        <SkipNavLink />
        <Layout
          themeConfig={{
            docsRepositoryBase:
              'https://github.com/shuding/nextra/blob/core/examples/swr-site',
            i18n: [
              { locale: 'en', name: 'English' },
              { direction: 'rtl', locale: 'es', name: 'Español RTL' },
              { locale: 'ru', name: 'Русский' }
            ]
          }}
          // @ts-expect-error fixme
          pageOpts={{
            pageMap,
            frontMatter: {},
            timestamp: new Date().getTime()
          }}
          banner={
            <Banner storageKey="swr-2">SWR 2.0 is out! Read more →</Banner>
          }
          navbar={
            <Navbar
              logo={
                <>
                  <SwrIcon className="h-3" />
                  <span
                    className="max-md:hidden select-none font-extrabold ms-2"
                    title={`SWR: ${dictionary.logo.title}`}
                  >
                    SWR
                  </span>
                </>
              }
              projectLink="https://github.com/vercel/swr"
              chatLink="https://discord.com"
            >
              <LocaleSwitch className="[&>span>span]:hidden" />
            </Navbar>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
