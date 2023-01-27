// import { createGetInitialProps } from "@mantine/next";
// import Document, { Head, Html, Main, NextScript } from "next/document";

// const getInitialProps = createGetInitialProps();

// export default class _Document extends Document {
//   static getInitialProps = getInitialProps;

//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }
import type { DocumentContext } from "next/document";
import Document from "next/document";

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }
}
