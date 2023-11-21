import React, { useState, useContext, useEffect } from 'react';
import styles from './OrgManage.module.css';
import { MenuContext } from "../../Office/Office";
import WhiteBtn from "../../../components/WhiteBtn/WhiteBtn"
import OrgNode from './components/OrgNode/OrgNode';
import axios from 'axios';

const OrgManage = () => {
    const { setSelectedMenu } = useContext(MenuContext);
    const [officeData, setOfficeData] = useState(null);

    useEffect(() => {
        axios.get("/org/office").then((resp) => {
            setOfficeData(resp.data);
            console.log(resp.data);
        }).catch(error => {
            console.error("There was an error!", error);
        });

        setSelectedMenu("organization");
        
    }, [setSelectedMenu]); // 의존성 배열에서 contextMenu 제거



    const renderOrgNodes = (departments) => {
        return departments.map((dept, index) => {
            // 부서 레벨에서의 스타일 결정
            const deptLength = departments.length;
            const isSoleDept = deptLength === 1;
            const isFirstDept = index === 0;
            const isLastDept = index === deptLength - 1;
            let deptStyles = styles.tree__entry;
            if (isSoleDept) {
                deptStyles += ` ${styles['tree__entry__sole']}`;
            } else {
                deptStyles += isFirstDept ? ` ${styles['tree__entry--first']}` : '';
                deptStyles += isLastDept ? ` ${styles['tree__entry--last']}` : '';
            }

            // 작업그룹 레벨에서의 스타일 결정
            const taskLength = dept.deptTask ? dept.deptTask.length : 0;

            return (
                <div key={dept.id} className={deptStyles}>
                    <OrgNode name={dept.dept_name} empCount={dept.dept_officer}/>
                    {taskLength > 0 && (
                        <div className={styles.tree__branch}>
                            {dept.deptTask.map((task, taskIndex) => {
                                const isSoleTask = taskLength === 1;
                                const isFirstTask = taskIndex === 0;
                                const isLastTask = taskIndex === taskLength - 1;
                                let taskStyles = styles.tree__entry;
                                if (isSoleTask) {
                                    taskStyles += ` ${styles['tree__entry__sole']}`;
                                } else {
                                    taskStyles += isFirstTask ? ` ${styles['tree__entry--first']}` : '';
                                    taskStyles += isLastTask ? ` ${styles['tree__entry--last']}` : '';
                                }

                                return (
                                    <div key={task.id} className={taskStyles}>
                                        <OrgNode name={task.task_name} empCount={task.dept_task_officer}/>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        });
    };


    // 조직도 전체를 렌더링하는 함수
    const renderOrgChart = () => {
        if (!officeData) return null;

        return (
            <div className={styles.tree}>
                <OrgNode name={officeData.office_name} empCount={officeData.total_officer}/>
                <div className={styles.tree__branch}>
                    {renderOrgNodes(officeData.department)}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.org__mother__div}>
            <div className={styles.org__title}>
                <p className={styles.org__title__text}>조직 관리</p>
            </div>
            <hr />
            <div className={styles.org__detail}>
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
                                {renderOrgChart()}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.org__sort}><WhiteBtn title="오피스 정보 수정"></WhiteBtn></td>
                            <td className={styles.org__sort}><WhiteBtn title="상위부서 정보 수정"></WhiteBtn></td>
                            <td className={styles.org__sort}><WhiteBtn title="부서 정보 수정"></WhiteBtn></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrgManage;
