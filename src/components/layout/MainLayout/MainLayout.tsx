import React from 'react';
import clsx from 'clsx';
import styles from './MainLayout.module.scss';
import { NavBar } from '../../features/NavBar/NavBar';
import { Footer } from '../Footer/Footer';

const Component = ({className, children}: {className?: string, children?: React.ReactNode}) => (
  <div className={clsx(className, styles.root)}>
    <NavBar />
    {children}
    <Footer />
  </div>
);

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
