import styles from "./Hamburger.module.css";
import classNames from 'classnames';

const HamburgerIcon = ({ isOpen, ...rest }) => {
  return (
    <div className={classNames(styles.root, {
      [styles.isOpen]: isOpen
    })}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default HamburgerIcon
