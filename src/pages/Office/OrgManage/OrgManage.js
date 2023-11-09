import React, { useState, useContext, useEffect } from 'react';
import styles from './OrgManage.module.css';
import { MenuContext } from "../../Office/Office";
import OrgNode from './OrgNode/OrgNode';
import axios from 'axios';

const OrgManage = () => {
    const { setSelectedMenu } = useContext(MenuContext);
    const [officeData, setOfficeData] = useState(null);
    // 컨텍스트 메뉴 상태
    const [contextMenu, setContextMenu] = useState(null);


    useEffect(() => {
        axios.get("/org/office").then((resp) => {
            setOfficeData(resp.data);
            console.log(resp.data);
        }).catch(error => {
            console.error("There was an error!", error);
        });

        setSelectedMenu("organization");

        
        

    }, [setSelectedMenu,contextMenu]); // 의존성 배열에서 contextMenu 제거

    const onContextMenu = (id, position) => {

        const menuWidth = 150; // 가정한 컨텍스트 메뉴의 너비
        const menuHeight = 100; // 가정한 컨텍스트 메뉴의 높이


        const { innerWidth, innerHeight } = window;


        const x = position.x + menuWidth > innerWidth ? position.x - menuWidth : position.x;

        const y = position.y + menuHeight > innerHeight ? position.y - menuHeight : position.y;

        setContextMenu({
            nodeId: id,
            xPos: x,
            yPos: y,
        });
    };

    // 컨텍스트 메뉴를 렌더링하는 함수
    const renderContextMenu = () => {
        if (!contextMenu) return null;

        // 컨텍스트 메뉴 스타일
        const menuStyle = {
            position: 'absolute',
            top: `${contextMenu.yPos}px`,
            left: `${contextMenu.xPos}px`,
            backgroundColor: `white`
        };

        return (
            <div style={menuStyle} className={styles.context__menu}>
                {`aaaaaaa`}
            </div>
        );
    };


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
                    <OrgNode id={dept.id} name={dept.dept_name} empCount={dept.dept_officer} onContextMenu={onContextMenu} />
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
                                        <OrgNode id={task.id} name={task.task_name} empCount={task.dept_task_officer} onContextMenu={onContextMenu} />
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
                <OrgNode id={officeData.id} name={officeData.office_name} empCount={officeData.total_officer} onContextMenu={onContextMenu} />
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
                                {renderContextMenu()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrgManage;
