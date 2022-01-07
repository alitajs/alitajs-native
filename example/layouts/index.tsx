import React, { FC } from 'react';
import { IRouteComponentProps, Helmet } from 'umi';
import styles from './index.css';

export default ({ children, location, history }: IRouteComponentProps) => {
  const pageTitle = location.pathname.replace('/', '') || '插件集';
  const leftTitle = location.pathname === '/' ? '' : '返回';
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div className={styles.screen}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={styles.header}>
        <div className={styles.side} onClick={handleBack}>
          {leftTitle}
        </div>
        <div className={styles.title}>{pageTitle}</div>
        <div className={styles.side}></div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
