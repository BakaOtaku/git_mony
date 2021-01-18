import Router from 'next/router';
import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Aman Raj · AmanRaj1608</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
