//import React from 'react';
import clsx from 'clsx';
import styles from './InfoBoxes.module.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({className}: {className?: string}) => (
  <div className={clsx(className, styles.root)}>
    <Container className={styles.container}>

      <Col className={styles.info_box} xs={12} sm={4} md={3}>
        <div className={styles.box_wrapper}>
          <h5 className={styles.box_title}>
            always fresh
          </h5>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p className={styles.box_content}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
          </p>
        </div>
      </Col>

      <Col className={styles.info_box} xs={12} sm={4} md={3}>
        <div className={styles.box_wrapper}>
          <h5 className={styles.box_title}>
            free delivery
          </h5>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p className={styles.box_content}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          </p>
        </div>
      </Col>

      <Col className={styles.info_box} xs={12} sm={4} md={3}>
        <div className={styles.box_wrapper}>
          <h5 className={styles.box_title}>
            health care
          </h5>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p className={styles.box_content}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>
        </div>
      </Col>
    </Container>
  </div>
);

export {
  Component as InfoBoxes,
  Component as InfoBoxesComponent,
};
