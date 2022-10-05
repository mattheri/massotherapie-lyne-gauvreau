import { ElementType } from "react";

export interface SectionProps {
  _type: string;
  [key: string]: any;
}

export type As = keyof JSX.IntrinsicElements | ElementType;
