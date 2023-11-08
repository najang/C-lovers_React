// OrgBranch.js
import React from 'react';
import styles from './OrgBranch.module.css';

const OrgBranch = ({ children }) => {
  // React.Children.map을 사용하여 각 자식 컴포넌트에 함수를 적용합니다.
  return (
    <div className={styles.tree__branch}>
      {React.Children.map(children, (child, index) => {
        const isFirstChild = index === 0;
        const isLastChild = index === React.Children.count(children) - 1;
        const childClassName = `${styles.tree__entry} ${
          isFirstChild ? styles['tree__entry--first'] : ''
        } ${isLastChild ? styles['tree__entry--last'] : ''}`;

        return React.cloneElement(child, {
          className: `${child.props.className} ${childClassName}`,
        });
      })}
    </div>
  );
};

export default OrgBranch;