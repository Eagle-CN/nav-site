import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 添加 CSP 头 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; 
            script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
            style-src 'self' 'unsafe-inline';
            img-src 'self' https://images.unsplash.com data:;"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 