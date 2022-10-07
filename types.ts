import { ElementType, HTMLAttributes } from "react";

export interface SectionProps {
  _type: string;
  [key: string]: any;
}

export interface Asset {
  asset: {
    extension: string;
    url: string;
  };
  title: string;
}

interface ReferencePage {
  _type: "reference";
  _ref: string;
}

export interface Slug {
  _type: "slug";
  current: string;
}

export interface Route {
  slug: Slug;
}

export interface NavigationObject {
  includeInSitemap: boolean;
  page: ReferencePage;
  slug: Slug;
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "route";
  _updatedAt: string;
}

export interface Config {
  footerNavigation: NavigationObject[];
  footerText: SectionProps[];
  frontpage: ReferencePage;
  lang: string;
  logo: Asset;
  mainNavigation: NavigationObject[];
  title: string;
  url: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "site-config";
  _updatedAt: string;
}

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  config: Config;
}

export type As = keyof JSX.IntrinsicElements | ElementType;
