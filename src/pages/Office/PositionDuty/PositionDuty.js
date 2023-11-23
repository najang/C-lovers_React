import positionDuty from "./PositionDuty.module.css"
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../App";
import axios from "axios";


const PositionDuty = () => {

    const { setSelectedMenu } = useContext(MenuContext);
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [jobName, setJobName] = useState('');
    const [secLevel, setSecLevel] = useState('');
    const [newJobName, setNewJobName] = useState('');
    useEffect(() => {
        setSelectedMenu("positionduty");
        axios.get("/job/getJobInfo").then((resp) => {
            console.log(resp.data);
            setPositions(resp.data);
        }).catch((error) => {
            console.error("There was an error retrieving the job list!", error);
        })
    }, [])

    // 라디오 버튼 선택 시 호출되는 함수
    const handleRadioChange = (job) => {
        setJobName(job.job_name); // 직급명을 상태에 설정
        setSecLevel(job.security_level); // 보안등급을 상태에 설정
        setSelectedPosition(job.id); // 선택된 직급의 ID를 상태에 설정
    };

    // 직위 추가 버튼의 이벤트 핸들러
    const handleAddPosition = () => {
        // 입력 필드가 비어있지 않은지 확인
        if (newJobName.trim() === '') {
            alert('직위 이름을 입력해주세요.');
            return;
        }

        // axios.post 요청 보내기
        axios.post('/job/insertNewJob', { job_name: newJobName })
            .then((resp) => {
                const data = resp.data;
                console.log(data);
                alert('직위가 추가되었습니다.');
                // 추가 후 인풋 필드 초기화
                setNewJobName('');
                setPositions(prev => [...prev, { job_name: data.job_name, id: data.id, security_level: data.security_level }]);
            })
            .catch((error) => {
                // 요청 실패 처리
                console.error('직위 이름 추가 중 오류 발생:', error);
                alert('직위 이름 추가 중 오류가 발생했습니다.');
            });
    };

    const handleDeletePosition = () => {
        // 선택된 직위의 ID가 없을 경우 경고 메시지 표시
        if (!selectedPosition) {
            alert("삭제할 직위를 선택해주세요.");
            return;
        }
        // 선택된 직위 삭제 요청
        axios.delete(`/job/deleteById/${selectedPosition}`)
            .then(response => {
                alert("직위가 삭제되었습니다.");
                setPositions(prevPositions => prevPositions.filter(job => job.id !== selectedPosition));
                setSelectedPosition('');
                setJobName('');
                setSecLevel('')
            })
            .catch(error => {
                console.error("직위 삭제 중 오류 발생", error);
                alert("직위 삭제 중 오류가 발생했습니다.");
            });
    };

    const handleUpdatePosition = () => {
        if (!selectedPosition) {
            alert("업데이트할 직위를 선택해주세요.");
            return;
        }

        const updatedPosition = {
            job_name: jobName,
            sec_level: parseInt(secLevel.replace(/\D/g, ""), 10),
            id: selectedPosition
        }

        axios.put(`/job/updateById`, updatedPosition)
            .then(response => {
                alert("직위 정보가 업데이트되었습니다.");
                // 상태 업데이트 등의 추가 처리
                setPositions(prevPositions => prevPositions.map(job =>
                    job.id === selectedPosition ? { ...job, job_name: jobName, security_level: secLevel, id: selectedPosition } : job
                ));
                setSelectedPosition('');
                setJobName('');
                setSecLevel('')
            })
            .catch(error => {
                console.error("직위 정보 업데이트 중 오류 발생", error);
                alert("직위 정보 업데이트 중 오류가 발생했습니다.");
            });

    }

    useEffect(() => {
        setSelectedMenu("positionduty");
        axios.get("/job/getJobInfo").then((resp) => {
            console.log(resp.data);
            setPositions(resp.data);
        }).catch((error) => {
            console.error("There was an error retrieving the job list!", error);
        })
    }, [])




    return (
        <div className={positionDuty.position__container}>
            <div className={positionDuty.position__title}>직위관리</div>
            <hr className={positionDuty.position__hr} />
            <div className={positionDuty.position__div}>
                <div className={positionDuty.position__leftdiv}>
                    <table className={positionDuty.position__table}>
                        <colgroup>
                            <col width={`15%`} />
                            <col width={`75%`} />
                            <col width={`10%`} />
                        </colgroup>

                        <tbody>
                            {positions.map((job) => (
                                <tr className={positionDuty.position__row} key={job.id}>
                                    <td className={positionDuty.position__cellsec}>{job.security_level}</td>
                                    <td className={positionDuty.position__cell}>{job.job_name}</td>
                                    <td className={positionDuty.position__cell}>
                                        <input
                                            type="radio"
                                            name="positionSelect"
                                            value={job.id}
                                            checked={selectedPosition === job.id}
                                            onChange={() => handleRadioChange(job)} // 라디오 버튼 변경 시 핸들러 호출
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={positionDuty.postion__rightdiv}>
                    <div className={positionDuty.position__menubox}>
                        <div className={positionDuty.position__insertbox}>
                            <p>직위 추가하기</p>
                            <div className={positionDuty.position__insertform}>
                                <input
                                    type="text"
                                    placeholder="삽입할 직위 이름을 입력"
                                    className={positionDuty.position__insertinput}
                                    value={newJobName}
                                    onChange={(e) => setNewJobName(e.target.value)}
                                />
                                <button
                                    className={positionDuty.position__Btn}
                                    onClick={handleAddPosition}
                                >추가</button>
                            </div>
                        </div>
                        <hr />
                        <div className={positionDuty.position__modifybox}>
                            <p>직위 수정하기</p>
                            <div className={positionDuty.position__modifyform}>
                                <div className={positionDuty.position__modify__JobName}>
                                    <input
                                        type="text"
                                        id="modifyJobName"
                                        placeholder="수정할 직위이름을 입력"
                                        className={positionDuty.position__insertinput}
                                        value={jobName} // jobName 상태를 value에 바인딩
                                        onChange={(e) => setJobName(e.target.value)} // 입력 시 상태 업데이트
                                    />
                                </div>
                                <div className={positionDuty.position__modify__SecLevel}>
                                    <input
                                        type="text"
                                        id="modifySecLevel"
                                        placeholder="수정할 보안등급을 입력"
                                        className={positionDuty.position__insertinput}
                                        value={secLevel} // secLevel 상태를 value에 바인딩
                                        onChange={(e) => setSecLevel(e.target.value)} // 입력 시 상태 업데이트
                                    />
                                    <button
                                        className={positionDuty.position__Btn}
                                        onClick={handleUpdatePosition}
                                    >직위정보 변경</button>
                                </div>

                            </div>
                        </div>
                        <hr />
                        <div className={positionDuty.position__deletebox}>
                            <p>직위 삭제하기</p>
                            <div className={positionDuty.position__selectedPositionInfo}>
                                선택된 직위 : {jobName}
                            </div>
                            <div className={positionDuty.position__deleteform}>
                                <button className={positionDuty.position__Btn}
                                    onClick={handleDeletePosition}>삭제</button>
                            </div>
                        </div>
                        <hr />
                        <div className={positionDuty.position__radiobox}>
                            <p>라디오 박스 해제하기</p>
                            <div className={positionDuty.position__radioform}>
                                <button className={positionDuty.position__Btn}
                                    onClick={() => {
                                        setSelectedPosition('');
                                        setJobName('');
                                        setSecLevel('')
                                    }}>선택 해제</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




        </div>
    )

}

export default PositionDuty;