import officeAdmin from "./OfficeAdmin.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OfficeAdmin = () => {

    // 기본으로 가리키는 요소
    const [selected, setSelected] = useState("총괄");

    // 관리자 리스트 상태
    const [adminList, setAdminList] = useState([]);

    // 역할별 관리자 수 상태
    const [adminCounts, setAdminCounts] = useState({});


    useEffect(() => {
        axios.get("/adminmanage/selectAdmin").then((resp) => {
            setAdminList(resp.data);
        })
        axios.get("/adminmanage/selectAdminCount").then((resp) => {
            const countMap = {};
            resp.data.forEach(item => {
                countMap[item.authority_category_id] = item.manager_count;
            });
            setAdminCounts(countMap);
        });
    }, [])

    const handleSelect = (category) => {
        setSelected(category);
    };

    const onAdminManageeClick = () =>{
        setSelected("administrator")
    }

    const filteredAdmins = adminList.filter(admin => admin.authority_category_id === selected);

    return (
        <div className={officeAdmin.office__admin__div}>
            <div className={officeAdmin.office__admin__updiv}>
                <table>
                    <tbody>
                        <tr>
                            <td><p className={officeAdmin.office__admin__title}>관리자</p></td>
                            <td><Link to="./administrator"><button className={officeAdmin.office__adminmanage__button} onClick={onAdminManageeClick} >관리자 설정</button></Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={officeAdmin.office__admin__downdiv}>
                <div className={officeAdmin.office__admin__nav}>
                    <ul>
                        {['총괄', '인사', '전자결재', '회계'].map(category => (
                            <li
                                key={category}
                                onClick={() => handleSelect(category)}
                                className={selected === category ? officeAdmin.office__admin__nav__div__selected : officeAdmin.office__admin__nav__div}
                            >
                                {`${category} 관리자 (${adminCounts[category] || 0})`}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={officeAdmin.office__admin__maindiv}>
                    {filteredAdmins.length > 0 ? (
                        <table className={officeAdmin.office__admin__table}>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>부서</th>
                                    <th>직무</th>
                                    <th>직책</th>
                                    <th>권한 카테고리</th>
                                    <th>등록 날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAdmins.map(admin => (
                                    <tr key={admin.id}>
                                        <td>{admin.emp_name}</td>
                                        <td>{admin.dept_name}</td>
                                        <td>{admin.task_name}</td>
                                        <td>{admin.job_name}</td>
                                        <td>{admin.authority_category_id}</td>
                                        <td>{admin.reg_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>현재 {selected} 관리자는 등록되지 않았습니다.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default OfficeAdmin;
