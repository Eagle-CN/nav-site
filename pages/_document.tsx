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
        <title>A导航 - 一个小巧的导航网站</title>
        <meta name="description" content="一个小巧的导航网站"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 