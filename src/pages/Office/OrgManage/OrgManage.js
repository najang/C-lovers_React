// OrgManage.js
import React, { useContext, useEffect } from 'react';
import styles from './OrgManage.module.css';
import { MenuContext } from "../../Office/Office";
import OrgNode from './OrgNode/OrgNode';


const OrgBranch = ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const childrenCount = childrenArray.length;
    
    console.log(children)
    return (
      <div className={styles.tree__branch}>
        {childrenArray.map((child, index) => {
          const childClassName = `${styles.tree__entry} ${
            childrenCount === 1
              ? ''
              : `${index === 0 ? styles['tree__entry--first'] : ''} ${
                  index === childrenCount - 1 ? styles['tree__entry--last'] : ''
                }`
          }`;
          
          // Ensure that the child component can accept className prop
          const newProps = {
            ...child.props,
            className: child.props.className ? `${child.props.className} ${childClassName}` : childClassName,
          };
          const result = React.cloneElement(child, newProps);
          console.log(result);
          return result;
        })}
      </div>
    );
  };
  

const OrgManage = () => {

    const { setSelectedMenu } = useContext(MenuContext);
    // 네비바가 user에 고정되도록 설정
    useEffect(() => {
        return () => setSelectedMenu("organization");
    }, []);



    return (
        <div className={styles.org__mother__div}>
            <div className={styles.org__title}>
                <p className={styles.org__title__text}>조직 관리</p>
            </div>
            <hr />
            <div className={styles.org_detail}>
                <table className={styles.org__table}>
                    <thead>
                        <tr>
                            <th>
                                <p className={styles.org__level}>레벨1</p>
                            </th>
                            <th>
                                <p className={styles.org__level}>레벨2</p>
                            </th>
                            <th>
                                <p className={styles.org__level}>레벨3</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} className={styles.tree__td}>
                                <div className={styles.tree__div}>
                                    <div className={styles.tree}>
                                        <OrgNode name="클로버산업" empCount="23" />

                                        <div className={styles.tree__branch}>
                                            <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                                <OrgNode name="관리부" empCount="6"></OrgNode>
                                                <OrgBranch >
                                                    <OrgNode name="구매 총무팀" empCount="3" />
                                                    <OrgNode name="재무 회계팀" empCount="3" />
                                                </OrgBranch>
                                            </div>
                                            <div className={styles.tree__entry}>
                                                <OrgNode name="생산부" empCount="10"></OrgNode>
                                                <div className={styles.tree__branch}>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                                        <OrgNode name="생산 1팀" empCount="4"></OrgNode>
                                                    </div>
                                                    <div className={styles.tree__entry}>
                                                        <OrgNode name="생산 2팀" empCount="4"></OrgNode>
                                                    </div>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                                        <OrgNode name="품질관리팀" empCount="2"></OrgNode>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                                <OrgNode name="영업부" empCount="8"></OrgNode>
                                                <div className={styles.tree__branch}>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                                        <OrgNode name="고객지원팀" empCount="3"></OrgNode>
                                                    </div>
                                                    <div className={styles.tree__entry}>
                                                        <OrgNode name="영업 1팀" empCount="3"></OrgNode>
                                                    </div>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                                        <OrgNode name="영업 2팀" empCount="2"></OrgNode>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>

        </div>

    );
};

export default OrgManage;
