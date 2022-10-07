import { FC, useEffect } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import cn from "classnames";
import styles from "./Section.module.scss";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

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
      className={cn(styles.root, className, {
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
