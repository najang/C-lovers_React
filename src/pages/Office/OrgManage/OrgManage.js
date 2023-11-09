// OrgManage.js
import React, { useContext, useEffect } from 'react';
import styles from './OrgManage.module.css';
import { MenuContext } from "../../Office/Office";
import OrgNode from './OrgNode/OrgNode';
import axios from 'axios';


const OrgBranch = ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const childrenCount = childrenArray.length;

    return (
        <div className={styles.tree__branch}>
            {childrenArray.map((child, index) => {
                const isFirst = index === 0;
                const isLast = index === childrenCount - 1;
                const childClassName = `${styles.tree__entry} ${isFirst ? styles['tree__entry--first'] : ''} ${isLast ? styles['tree__entry--last'] : ''}`;

                // Ensure that we are not overwriting any existing className
                const newProps = {
                    ...child.props,
                    className: child.props.className
                        ? `${child.props.className} ${childClassName}`
                        : childClassName,
                };
                return React.cloneElement(child, newProps);
            })}
        </div>
    );
}


const OrgManage = () => {

    const { setSelectedMenu } = useContext(MenuContext);
    // const { orgData, setOrgData } = useState({
    //     office: "",
    //     people : 0,
    //     department: {[

    //     ]

    //     }
    // })

    // 네비바가 user에 고정되도록 설정
    useEffect(() => {
        let office = ""
        let officer = 0;
        let department = Array();
        let departmentInfo = []
        let deptTaskInfo = Array();

        axios.get("/org/office")
            .then((resp) => {
                office = resp.data.dept_name; // 서버로부터 받은 데이터를 콘솔에 출력
            })
        axios.get("/org/office/empCount")
            .then((resp) => {
                officer = resp.data;
            }
            )
        
        axios.get("/org/getDepartment")
            .then((resp) => {
                department = resp.data;

                // 모든 부서에 대한 empCount 요청을 생성합니다.
                const empCountRequests = department.map((dept) => {
                    return axios.get(`/org/getDepartment/${dept.id}/empCount`);
                });

                // 모든 요청이 완료될 때까지 기다립니다.
                return Promise.all(empCountRequests);
            })
            .then((empCountResponses) => {
                // 모든 empCount 요청의 결과를 처리합니다.
                departmentInfo =  empCountResponses.map((response, index) => {
                    return { deptOfficer: response.data, ...department[index] };
                });
            })
            .catch((error) => {
                // 에러 처리
                console.error("An error occurred:", error);
            });
        setSelectedMenu("organization");

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
                                                <div className={styles.tree__branch}>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--first']}`}>
                                                        <OrgNode name="구매 총무팀" empCount="3" />
                                                    </div>
                                                    <div className={`${styles.tree__entry} ${styles['tree__entry--last']}`}>
                                                        <OrgNode name="재무 회계팀" empCount="3" />
                                                    </div>
                                                </div>
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
