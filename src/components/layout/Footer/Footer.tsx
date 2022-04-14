import clsx from 'clsx';
import styles from './Footer.module.scss';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const Component = ({className}: {className?: string}) => (
  <div className={clsx(className, styles.root)}>
    <Col className={styles.icons}>
      <Nav.Link><i className="bi bi-facebook"></i></Nav.Link>
      <Nav.Link><i className="bi bi-instagram"></i></Nav.Link>
      <Nav.Link><i className="bi bi-twitter"></i></Nav.Link>
    </Col>
    <Col className={styles.paragraph}>
      <p>&copy; 2022 <span>squizzy</span> Group. All rights reserved.</p>
    </Col>
  </div>
);

export {
  Component as Footer,
  Component as FooterComponent,
};
