import type { AppProps } from "next/app";
import "../styles/shared.module.css";
import "../styles/layout.css";
import "../styles/custom-properties.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
