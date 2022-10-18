import { FC } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import cn from "classnames";
import styles from "./Section.module.scss";
import StorySecton from "../story-container/StoryContainer";

interface Props extends ContainerProps {
  type: string;
  revealInViewport?: boolean;
  root?: Omit<ContainerProps, "as" | "fluid">;
}

const Section: FC<Props> = ({
  type,
  as = "section",
  children,
  revealInViewport,
  className,
  root: { className: rootClassName, ...rootProps } = {},
  ...rest
}) => {
  return (
    <Container
      fluid
      as={as}
      className={cn(styles.root, rootClassName, "px-0")}
      {...rootProps}
    >
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
