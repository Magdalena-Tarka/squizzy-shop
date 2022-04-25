import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useRedirect } from '../../../hooks/useRedirect';

const Component = ({className}) => {
  const pushHomepage = useRedirect('/');

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.card_wrapper)}
          lg={12}
          xl={11}
        >
          <Col
            className={styles.inner}
          >
            <h3>404</h3>
            <h3>Not Found</h3>
            <p>
              The page you are looking for seems to not exist..
            </p>
            <Button className={styles.nf_btn}
              onClick={pushHomepage}
            >go to homepage</Button>
          </Col>
        </Col>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
