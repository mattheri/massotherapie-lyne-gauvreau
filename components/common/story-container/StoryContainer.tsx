import type { FC } from "react";
import type { ContainerProps } from "react-bootstrap/Container";

import { useEffect } from "react";

import Container from "react-bootstrap/Container";

import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import cn from "classnames";

import styles from "./Section.module.scss";

interface Props extends ContainerProps {
  type: string;
}

const StorySecton: FC<Props> = ({
  type,
  as = "section",
  children,
  className,
  ...rest
}) => {
  const [ref, entry, disconnect] = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry.isIntersecting) disconnect();
  }, [entry.isIntersecting]);

  return (
    <Container
      as={as}
      className={cn(styles.content, className, {
        [styles.inView]: entry?.isIntersecting,
        [styles.notInView]: !entry?.isIntersecting,
      })}
      data-section-type={`${type}`}
      ref={ref}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default StorySecton;
