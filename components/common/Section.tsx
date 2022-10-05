import { FC } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import classNames from "classnames";
import styles from "./Section.module.css";

interface Props extends ContainerProps {
  type: string;
}

const Section: FC<Props> = ({ type, as = "section", children, ...rest }) => {
  return (
    <Container
      as={as}
      className={classNames(styles.root, rest.className)}
      data-section-type={`${type}`}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Section;
