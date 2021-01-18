import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>

          {/* Import Images */}
          <meta name="description" content="" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/4.jpg" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#389393"></meta>
          <link rel="preconnect" rel="stylesheet" type="text/css" href="/main.css" />
          <link rel="prefetch" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=PT+Mono&display=swap" as="font" type="font" crossOrigin="true" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;