import React from 'react';
import styles from './AuthCard.module.scss';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  height?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, height }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container} style={{ height: height || '320px' }}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
