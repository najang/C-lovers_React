import React, { useState, useContext, useEffect } from "react";
import styles from "./OrgManage.module.css";
import { MenuContext } from "../../../App";
import OrgNode from "./components/OrgNode/OrgNode";
import axios from "axios";

const OrgManage = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  const [officeData, setOfficeData] = useState(null);


  // 라디오 버튼 상태 관리
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedDeptName, setSelectedDeptName] = useState('');
  const [selectedTaskName, setSelectedTaskName] = useState('');

  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const [selectedDeptOfficer, setSelectedDeptOfficer] = useState(0);
  const [selectedTaskOfficer, setSelectedTaskOfficer] = useState(0);

  const [newDeptName, setNewDeptName] = useState('');
  const [updateDeptName, setUpdateDeptName] = useState('');

  const [newTaskName, setNewTaskName] = useState('');
  const [updateTaskName, setUpdateTaskName] = useState('');

  const handleRadioChange = (type, id, name, officer) => {
    if (type === 'office') setSelectedOffice(name);
    else if (type === 'dept') {
      setSelectedDeptName(name);
      setSelectedDeptId(id);
      setSelectedDeptOfficer(officer);
    }
    else if (type === 'task') {
      setSelectedTaskName(name);
      setSelectedTaskId(id);
      setSelectedTaskOfficer(officer);
    }
  };

  useEffect(() => {
    console.log(selectedDeptId, selectedDeptOfficer);
  }, [selectedDeptId]);

  useEffect(() => {
    console.log(selectedTaskId, selectedTaskOfficer);
  }, [selectedTaskId]);

  // 오피스 이름과 이메일 주소 상태
  const [officeName, setOfficeName] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');

  // 오피스 이름 변경 핸들러
  const handleOfficeNameChange = (e) => {
    setOfficeName(e.target.value);
  };

  // 오피스 이메일 변경 핸들러
  const handleOfficeEmailChange = (e) => {
    setOfficeEmail(e.target.value);
  };

  // 오피스 이름 업데이트 함수
  const updateOfficeName = () => {
    if (officeName) {
      axios.put('/org/updateOfficeName', { office_name: officeName })
        .then(resp => {
          alert('오피스 이름이 업데이트되었습니다.');
          setOfficeData(prev => ({ ...prev, office_name: resp.data.office_name }));
        })
        .catch(error => {
          console.error('오피스 이름 업데이트 중 오류 발생', error);
        });
    }
    else {
      alert('변경할 오피스 이름을 제대로 입력해주세요!');
    }

  };

  // 오피스 이메일 업데이트 함수
  const updateOfficeEmail = () => {
    if (officeEmail) {
      axios.put('/org/updateOfficeEmail', { office_email: officeEmail })
        .then(resp => {
          alert('오피스 이메일이 수정 되었습니다.');
          setOfficeData(prev => ({ ...prev, office_email: resp.data.office_email }));
        })
        .catch(error => {
          console.error('오피스 이메일 업데이트 중 오류 발생', error);
        });
    }
    else {
      alert('변경할 오피스 이메일을 입력해주세요!');
    }
  };

  const insertNewDepartment = () => {
    if (newDeptName) {
      axios.post("/org/insertNewDepartment", { dept_name: newDeptName })
        .then(resp => {
          alert('새로운 상위부서가 등록되었습니다.');
          setOfficeData(prev => ({
            ...prev,
            department: [...prev.department, resp.data]
          }));
          setNewDeptName('');
        })
        .catch(error => {
          console.error('상위부서 추가 중 오류 발생', error);
        });
    }
    else {
      alert("추가할 상위 부서명을 입력해주세요!")
    }


  };

  const updateDepartmentName = () => {
    if (updateDeptName !== "") {
      axios.put("/org/updateDeptNameModify", { dept_name: updateDeptName, id: selectedDeptId })
        .then(resp => {
          alert('상위부서명이 수정 되었습니다.');
          setOfficeData(prev => ({
            ...prev,
            department: prev.department.map(dept =>
              dept.id === selectedDeptId ? { ...dept, dept_name: resp.data.dept_name } : dept
            )
          }));
          setSelectedDeptName('');
          setSelectedDeptId('');
          setSelectedDeptOfficer(0);
          setUpdateDeptName('');
        })
        .catch(error => {
          console.error("상위부서명 수정 중 오류 발생", error);
        });
    } else {
      alert("변경할 상위 부서명을 입력해주세요!")
    }

  };


  const deleteDepartment = () => {
    if (selectedDeptId) {
      axios.delete(`/org/deleteDepartmentById`, { data: { id: selectedDeptId } })
        .then(() => {
          alert('상위부서가 삭제되었습니다.');
          setOfficeData(prev => ({
            ...prev,
            department: prev.department.filter(dept => dept.id !== selectedDeptId)
          }));
          // 선택 상태 초기화
          setSelectedDeptName('');
          setSelectedDeptId('');
          setSelectedDeptOfficer(0);
        })
        .catch(error => {
          console.error("상위부서 삭제 중 오류 발생", error);
        });
    } else {
      alert('삭제할 상위부서를 선택해주세요.');
    }
  };

  const insertNewDeptTask = () => {
    if (newTaskName && selectedDeptId) {
      axios.post('/org/insertNewDeptTask', {
        task_name: newTaskName,
        dept_id: selectedDeptId
      })
        .then(resp => {
          alert('새 부서 작업이 추가되었습니다.');

          // 서버에서 반환된 새 부서 작업 데이터
          const newDeptTask = resp.data;

          // 상태 업데이트
          setOfficeData(prev => {
            // 선택된 상위부서를 찾기
            const updatedDepartments = prev.department.map(dept => {
              if (dept.id === selectedDeptId) {
                return {
                  ...dept,
                  deptTask: [...dept.deptTask, newDeptTask] // 새 부서 작업 추가
                };
              }
              return dept;
            });

            return {
              ...prev,
              department: updatedDepartments
            };
          });
          // 입력 필드 초기화
          setNewTaskName('');
          setSelectedDeptName("");
          setSelectedDeptId("");
          setSelectedDeptOfficer(0);
          setSelectedTaskName("");
          setSelectedTaskId("");
          setSelectedTaskOfficer(0);
        })
        .catch(error => {
          console.error('새 부서 추가 작업 중 오류 발생', error);
        });
    } else {
      alert('추가할 부서명을 입력하거나 상위부서를 선택해주세요!');
    }
  };

  const updateTaskNameModify = () => {
    if (updateTaskName && selectedTaskId) {
      axios.put('/org/updateTaskNameModify', {
        task_name: updateTaskName,
        id: selectedTaskId
      })
        .then(resp => {
          alert('부서명 수정이 완료되었습니다!');

          // 서버에서 반환된 업데이트된 부서 작업 데이터
          const updatedDeptTask = resp.data;

          // 상태 업데이트
          setOfficeData(prev => {
            // 모든 상위부서 내의 부서 작업을 업데이트
            const updatedDepartments = prev.department.map(dept => ({
              ...dept,
              deptTask: dept.deptTask.map(task =>
                task.id === selectedTaskId ? updatedDeptTask : task
              )
            }));

            return {
              ...prev,
              department: updatedDepartments
            };
          });

          // 선택 상태와 입력 필드 초기화
          setSelectedTaskName('');
          setSelectedTaskId('');
          setUpdateTaskName('');
        })
        .catch(error => {
          console.error('부서명 수정 작업 중 오류 발생', error);
        });
    } else {
      alert('수정할 부서명을 입력하거나 부서를 선택해주세요!');
    }
  };

  const updateTaskDeptIdModify = () => {
    if (selectedDeptId && selectedTaskId) {
      axios.put('/org/updateTaskDeptIdModify', {
        id: selectedTaskId,
        dept_id: selectedDeptId
      })
        .then(resp => {
          alert('부서의 상위 부서가 변경되었습니다.');

          // 서버에서 반환된 업데이트된 부서 작업 데이터
          const updatedDeptTask = resp.data;

          // 상태 업데이트
          setOfficeData(prev => {
            // 모든 상위부서를 순회하며 업데이트된 부서 작업을 찾아 해당 데이터를 갱신
            const updatedDepartments = prev.department.map(dept => {
              // 업데이트된 부서 작업이 속한 새로운 상위부서를 찾음
              if (dept.id === updatedDeptTask.dept_id) {
                return {
                  ...dept,
                  deptTask: [...dept.deptTask, updatedDeptTask]
                };
              } else {
                // 기존의 상위부서에서 업데이트된 부서 작업을 제거
                return {
                  ...dept,
                  deptTask: dept.deptTask.filter(task => task.id !== updatedDeptTask.id)
                };
              }
            });

            return {
              ...prev,
              department: updatedDepartments
            };
          });

          // 선택 상태 초기화
          setSelectedTaskName('');
          setSelectedTaskId('');
          setSelectedDeptName('');
          setSelectedDeptId('');
        })
        .catch(error => {
          console.error('부서의 상위 부서 변경 중 오류 발생', error);
        });
    } else {
      alert('변경할 상위부서와 부서를 선택해주세요!');
    }
  };

  const deleteTaskById = () => {
    if (selectedTaskId) {
      axios.delete("/org/deleteTaskById", { data: { id: selectedTaskId } })
        .then(() => {
          alert("부서가 삭제되었습니다.");

          // 상태 업데이트 로직
          setOfficeData(prev => {
            // 모든 상위부서를 순회하며 삭제된 부서 작업을 제거
            const updatedDepartments = prev.department.map(dept => ({
              ...dept,
              // 해당 상위부서의 부서 작업 목록에서 삭제된 부서 작업 제거
              deptTask: dept.deptTask.filter(task => task.id !== selectedTaskId)
            }));

            return {
              ...prev,
              department: updatedDepartments
            };
          });

          // 선택 상태 초기화
          setSelectedTaskId('');
          setSelectedTaskName('');
          setSelectedTaskOfficer(0);
        })
        .catch(error => {
          console.error("부서 삭제 중 오류 발생", error);
          alert("부서 삭제 중 오류가 발생했습니다.");
        });
    } else {
      alert("삭제할 부서를 선택해주세요!");
    }
  };





  useEffect(() => {
    axios
      .get("/org/office")
      .then((resp) => {
        setOfficeData(resp.data);
        setOfficeName(resp.data.office_name);
        setOfficeEmail(resp.data.office_email);
        console.log(resp.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setSelectedMenu("organization");
  }, [setSelectedMenu]);

  const renderOrgNodes = (departments) => {
    return departments.map((dept, index) => {
      // 부서 레벨에서의 스타일 결정
      const deptLength = departments.length;
      const isSoleDept = deptLength === 1;
      const isFirstDept = index === 0;
      const isLastDept = index === deptLength - 1;
      let deptStyles = styles.tree__entry;
      if (isSoleDept) {
        deptStyles += ` ${styles["tree__entry__sole"]}`;
      } else {
        deptStyles += isFirstDept ? ` ${styles["tree__entry--first"]}` : "";
        deptStyles += isLastDept ? ` ${styles["tree__entry--last"]}` : "";
      }

      // 작업그룹 레벨에서의 스타일 결정
      const taskLength = dept.deptTask ? dept.deptTask.length : 0;

      return (
        <div key={dept.id} className={deptStyles}>
          {dept && (
            <OrgNode
              name={dept.dept_name}
              empCount={dept.dept_officer}
              type="dept"
              id={dept.id}
              officer={dept.dept_officer}
              onRadioChange={handleRadioChange}
              isSelected={selectedDeptName === dept.dept_name} />
          )}
          {taskLength > 0 && (
            <div className={styles.tree__branch}>
              {dept.deptTask.map((task, taskIndex) => {
                const isSoleTask = taskLength === 1;
                const isFirstTask = taskIndex === 0;
                const isLastTask = taskIndex === taskLength - 1;
                let taskStyles = styles.tree__entry;
                if (isSoleTask) {
                  taskStyles += ` ${styles["tree__entry__sole"]}`;
                } else {
                  taskStyles += isFirstTask
                    ? ` ${styles["tree__entry--first"]}`
                    : "";
                  taskStyles += isLastTask
                    ? ` ${styles["tree__entry--last"]}`
                    : "";
                }

                return (
                  <div key={task.id} className={taskStyles}>
                    {task && (
                      <OrgNode
                        name={task.task_name}
                        empCount={task.dept_task_officer}
                        type="task"
                        id={task.id}
                        officer={task.dept_task_officer}
                        onRadioChange={handleRadioChange}
                        isSelected={selectedTaskName === task.task_name}
                      />
                    )}
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
        {officeData && (
          <OrgNode
            name={officeData.office_name}
            empCount={officeData.total_officer}
            type="office"
            onRadioChange={handleRadioChange}
            isSelected={selectedOffice === officeData.office_name}
          />
        )}
        <div className={styles.tree__branch}>
          {renderOrgNodes(officeData.department)}
        </div>
      </div>
    );
  };

  const handleDeptState = () => {
    setSelectedDeptName('');
    setSelectedDeptId('');
    setSelectedDeptOfficer(0);
  }

  const handleTaskState = () => {
    setSelectedTaskName('');
    setSelectedTaskId('');
    setSelectedTaskOfficer(0);
  }

  const handleAllState = () => {
    setSelectedDeptName('');
    setSelectedDeptId('');
    setSelectedDeptOfficer(0);
    setSelectedTaskName('');
    setSelectedTaskId('');
    setSelectedTaskOfficer(0);
  }

  const handleNewDept = (e) => {
    setNewDeptName(e.target.value);
  }

  const handleUpdateDept = (e) => {
    setUpdateDeptName(e.target.value);
  }

  const handleInsertTask = (e) => {
    setNewTaskName(e.target.value);
  }

  const handleUpdateTaskName = (e) => {
    setUpdateTaskName(e.target.value);
  }


  return (
    <div className={styles.org__mother__div}>
      <div className={styles.org__title}>
        <p className={styles.org__title__text}>조직 관리</p>
      </div>
      <hr />
      <div className={styles.org__detail}>
        <div className={styles.org__detailDiv}>
          <div className={styles.org__detailLeft}>
            <table className={styles.org__table}>
              <thead>
                <tr>
                  <th>
                    <p className={styles.org__level}>오피스</p>
                  </th>
                  <th>
                    <p className={styles.org__level}>상위 부서</p>
                  </th>
                  <th>
                    <p className={styles.org__level}>부서</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className={styles.tree__td}>
                    {renderOrgChart()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.org__detailRight}>
            {/* 라디오버튼 해제 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>라디오버튼 해제</div>
              <div className={styles.org__description__mini}>각 버튼을 누르면 라디오 버튼이 완전 해제</div>
              <div>
                <button
                  className={`${styles.org__button} ${!selectedDeptId ? styles["org__button__disabled"] : ''}`}
                  onClick={handleDeptState}
                  disabled={!selectedDeptId}
                >상위부서 해제</button>

                <button
                  className={`${styles.org__button} ${!selectedTaskId ? styles["org__button__disabled"] : ''}`}
                  onClick={handleTaskState}
                  disabled={!selectedTaskId}
                >부서 해제</button>

                <button
                  className={`${styles.org__button} ${!selectedDeptId && !selectedTaskId ? styles["org__button__disabled"] : ''}`}
                  onClick={handleAllState}
                  disabled={!selectedDeptId && !selectedTaskId}
                >전체 해제</button>

              </div>
            </div>
            <hr />

            {/* 오피스 - 이름 변경 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>오피스 - 이름 변경</div>
              <div>
                <input
                  type="text"
                  placeholder="변경할 오피스 이름 입력"
                  className={styles.org__input}
                  value={officeName}
                  onChange={handleOfficeNameChange}
                />
                <button
                  className={`${styles.org__button} ${!officeName ? styles["org__button__disabled"] : ''}`}
                  onClick={updateOfficeName}
                  disabled={!officeName}
                >이름 변경</button>
              </div>
            </div>
            <hr />

            {/* 오피스 - 이메일주소 변경 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>오피스 - 이메일주소 변경</div>
              <div className={styles.org__description__mini}>현재 오피스 이메일 주소 : {officeEmail}</div>
              <div>
                <input
                  type="text"
                  placeholder="변경할 이메일 주소 입력"
                  className={styles.org__input}
                  value={officeEmail}
                  onChange={handleOfficeEmailChange}
                />
                <button
                  className={`${styles.org__button} ${!officeEmail ? styles["org__button__disabled"] : ''}`}
                  onClick={updateOfficeEmail}
                  disabled={!officeEmail}
                >주소 변경</button>
              </div>
            </div>
            <hr />

            {/* 상위 부서 - 추가 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>상위 부서 - 추가</div>
              <div>
                <input
                  type="text"
                  placeholder="추가할 상위 부서명 입력"
                  className={styles.org__input}
                  value={newDeptName}
                  onChange={handleNewDept} />
                <button
                  className={`${styles.org__button} ${!newDeptName ? styles["org__button__disabled"] : ''}`}
                  onClick={insertNewDepartment}
                  disabled={!newDeptName}
                >추가</button>
              </div>
            </div>
            <hr />

            {/* 상위 부서 - 이름 변경 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>상위 부서 - 이름 변경</div>
              <div className={styles.org__description__mini}>선택한 상위 부서명 : {selectedDeptName}</div>
              <div>
                <input
                  type="text"
                  placeholder="수정할 상위 부서명 입력"
                  className={styles.org__input}
                  value={updateDeptName}
                  onChange={handleUpdateDept}
                />
                <button
                  className={`${styles.org__button} ${!updateDeptName || !selectedDeptId ? styles["org__button__disabled"] : ''}`}
                  onClick={updateDepartmentName}
                  disabled={!updateDeptName || !selectedDeptId}
                >이름 변경</button>
              </div>
            </div>
            <hr />

            {/* 상위 부서 - 삭제 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>상위 부서 - 삭제</div>
              <div className={styles.org__description__mini}>선택한 상위 부서명 : {selectedDeptName}</div>
              <div className={styles.org__description__mini}>선택한 상위 부서 인원 수 : {selectedDeptOfficer}</div>
              <div>
                <button
                  className={`${styles.org__button} ${selectedDeptOfficer !== 0 || !selectedDeptId ? styles["org__button__disabled"] : ''}`}
                  onClick={deleteDepartment}
                  disabled={selectedDeptOfficer !== 0 || !selectedDeptId}
                >삭제</button>
              </div>
            </div>
            <hr />

            {/* 부서 - 추가 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>부서 - 추가</div>
              <div className={styles.org__description__mini}>소속할 상위 부서명 : {selectedDeptName}</div>
              <div>
                <input
                  type="text"
                  className={styles.org__input}
                  placeholder="추가할 부서명 입력"
                  value={newTaskName}
                  onChange={handleInsertTask}
                />
                <button
                  className={`${styles.org__button} ${!newTaskName || !selectedDeptId ? styles["org__button__disabled"] : ''}`}
                  onClick={insertNewDeptTask}
                  disabled={!newTaskName || !selectedDeptId}
                >추가</button>

              </div>
            </div>
            <hr />

            {/* 부서 - 이름 변경 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>부서 - 이름 변경</div>
              <div className={styles.org__description__mini}>선택한 부서명 : {selectedTaskName}</div>
              <div>
                <input
                  type="text"
                  className={styles.org__input}
                  placeholder="수정할 부서명 입력"
                  value={updateTaskName}
                  onChange={handleUpdateTaskName}
                />
                <button
                  className={`${styles.org__button} ${(!updateTaskName || !selectedTaskId) ? styles["org__button__disabled"] : ''}`}
                  onClick={updateTaskNameModify}
                  disabled={!updateTaskName || !selectedTaskId}
                >
                  이름 변경
                </button>

              </div>
            </div>
            <hr />

            {/* 부서 - 상위 부서 변경 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>부서 - 상위 부서 변경</div>
              <div className={styles.org__description__mini}>선택한 부서명 : {selectedTaskName}</div>
              <div className={styles.org__description__mini}>소속할 상위 부서명 : {selectedDeptName}</div>
              <div>
                <button
                  className={`${styles.org__button} ${(!selectedDeptId || !selectedTaskId) ? styles["org__button__disabled"] : ''}`}
                  onClick={updateTaskDeptIdModify}
                  disabled={!selectedDeptId || !selectedTaskId}
                >
                  소속 변경
                </button>

              </div>
            </div>
            <hr />

            {/* 부서 - 삭제 */}
            <div className={styles.org__menu}>
              <div className={styles.org__description}>부서 - 삭제</div>
              <div className={styles.org__description__mini}>선택한 부서명 : {selectedTaskName}</div>
              <div className={styles.org__description__mini}>선택한 부서 인원 : {selectedTaskOfficer}</div>
              <div>
                <button
                  className={`${styles.org__button} ${(selectedTaskOfficer !== 0 || !selectedTaskId) ? styles["org__button__disabled"] : ''}`}
                  onClick={deleteTaskById}
                  disabled={selectedTaskOfficer !== 0 || !selectedTaskId}
                >
                  삭제
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrgManage;
