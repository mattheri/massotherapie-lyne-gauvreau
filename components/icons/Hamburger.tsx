import styles from "./Hamburger.module.scss";
import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const HamburgerIcon: FC<Props> = ({ isOpen, ...rest }) => {
  const label = isOpen ? "Close menu" : "Open menu";

  return (
    <div
      aria-label={label}
      role="button"
      className={classNames(styles.root, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default HamburgerIcon;
