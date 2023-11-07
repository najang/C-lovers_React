// OrgManage.js
import React from 'react';
import styles from './OrgManage.module.css'; // CSS 모듈을 임포트합니다.

const OrgManage = () => {
    return (
        <div className={styles.org__mother__div}>
            <div className={styles.org__title}>
                <p className={styles.org__title__text}>조직 관리</p>
            </div>
            <hr/>
            <table>
            </table>
            <div className={styles.tree}>
                <span className={styles.tree__label}>클로버 산업</span>
                <div className={styles.tree__branch}>
                    <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                        <span className={styles.tree__label}>선택안함</span>
                    </div>
                    <div className={styles.tree__entry}>
                        <span className={styles.tree__label}>관리부</span>
                        <div className={styles.tree__branch}>
                            <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                <span className={styles.tree__label}>Entry-3-1</span>
                            </div>
                            <div className={styles.tree__entry}>
                                <span className={styles.tree__label}>Entry-3-2</span>
                            </div>
                            <div className={styles.tree__entry}>
                                <span className={styles.tree__label}>Entry-3-3</span>
                            </div>
                            <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                <span className={styles.tree__label}>Entry-3-4</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tree__entry}>
                        <span className={styles.tree__label}>생산부</span>
                        <div className={styles.tree__branch}>
                            <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                <span className={styles.tree__label}>Entry-3-1</span>
                            </div>
                            <div className={styles.tree__entry}>
                                <span className={styles.tree__label}>Entry-3-2</span>
                            </div>
                            <div className={styles.tree__entry}>
                                <span className={styles.tree__label}>Entry-3-3</span>
                            </div>
                            <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                <span className={styles.tree__label}>Entry-3-4</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                        <span className={styles.tree__label}>영업부</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OrgManage;
