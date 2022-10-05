import type { AppProps } from "next/app";
import "../styles/shared.module.css";
import "../styles/layout.css";
import "../styles/custom-properties.css";
import Fonts from "../components/Fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Fonts />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
