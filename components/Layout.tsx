import Head from "next/head";
import { LogoJsonLd } from "next-seo";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import { FC } from "react";
import { LayoutProps } from "../types";

const Layout: FC<LayoutProps> = ({ config, children }) => {
  if (!config) {
    console.error("Missing config");
    return <div>Missing config</div>;
  }

  const { title, mainNavigation, footerNavigation, footerText, logo, url } =
    config;
  const logoUrl = logo && logo.asset && logo.asset.url;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>
      <Container fluid className="px-0" as="main">
        <Header title={title} navItems={mainNavigation} logo={logo} />
        <div className="content">{children}</div>
        <Footer navItems={footerNavigation} text={footerText} />
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </Container>
    </>
  );
};

export default Layout;
