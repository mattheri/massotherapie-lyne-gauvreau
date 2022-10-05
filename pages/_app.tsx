import type { AppProps } from "next/app";
import "../styles/shared.module.css";
import "../styles/layout.css";
import "../styles/custom-properties.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
