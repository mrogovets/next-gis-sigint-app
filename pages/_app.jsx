import "../styles/globals.css";
import App, { Container } from "next/app";
if (typeof global.navigator === "undefined") global.navigator = {};
// const navigator = {};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
