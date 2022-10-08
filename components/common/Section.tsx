import { FC } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import cn from "classnames";
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
  className,
  ...rest
}) => {
  return (
    <Container fluid as={as} className={cn(styles.root, "px-0")}>
      {revealInViewport ? (
        <StorySecton type={type} {...rest} className={className}>
          {children}
        </StorySecton>
      ) : (
        <Container
          className={className}
          data-section-type={`${type}`}
          {...rest}
        >
          {children}
        </Container>
      )}
    </Container>
  );
};

export default Section;
