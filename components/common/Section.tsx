import { FC } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import classNames from "classnames";
import styles from "./Section.module.scss";
import StorySecton from "./StoryContainer";

interface Props extends ContainerProps {
  type: string;
  revealInViewport?: boolean;
}

const Section: FC<Props> = ({
  type,
  as = "section",
  children,
  revealInViewport,
  ...rest
}) => {
  return revealInViewport ? (
    <StorySecton type={type} as={as} {...rest}>
      {children}
    </StorySecton>
  ) : (
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
