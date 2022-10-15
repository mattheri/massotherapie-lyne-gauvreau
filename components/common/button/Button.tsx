import type { FC } from "react";
import type { ButtonProps } from "react-bootstrap/Button";
import Link, { LinkProps } from "next/link";

import BsButton from "react-bootstrap/Button";

import cn from "classnames";

import styles from "./Button.module.scss";

type LinkPropsWithPassableData = LinkProps & {
  data?: Record<string, unknown>;
};

type Props =
  | ({
      link?: LinkPropsWithPassableData;
    } & ButtonProps)
  | ({
      link?: never;
    } & ButtonProps);

const Button: FC<Props> = ({ children, link, className, ...rest }) => {
  if (link) {
    return (
      <Link {...link}>
        <BsButton
          className={cn(styles.root, className)}
          as="a"
          {...link.data}
          {...rest}
        >
          {children}
        </BsButton>
      </Link>
    );
  }

  return (
    <BsButton className={cn(styles.root, className)} {...rest}>
      {children}
    </BsButton>
  );
};

export default Button;
