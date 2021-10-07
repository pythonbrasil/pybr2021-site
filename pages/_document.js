import Document, { Html, Head, Main, NextScript } from 'next/document'


class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
