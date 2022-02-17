import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ children, isSBMenuOpen }) {
  return (
    <>
      <Head>
        <title>GIS SigInt | Main Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content="GIS SigInt System"
          key="GIS, SigInt, System"
        />
      </Head>
      <Navbar isSBMenuOpen={isSBMenuOpen} />
      <main>{children}</main>
    </>
  );
}
