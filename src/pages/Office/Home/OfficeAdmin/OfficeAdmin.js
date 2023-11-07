import officeAdmin from "./OfficeAdmin.module.css";
import { useState } from "react";

const OfficeAdmin = () => {
    const [selected, setSelected] = useState("totalManager");

    const handleSelect = (category) => {
        setSelected(category);
    };

    return (
        <div className={officeAdmin.office__admin__div}>
            <div className={officeAdmin.office__admin__updiv}>
                <p className={officeAdmin.office__admin__title}>관리자</p>
            </div>
            <div className={officeAdmin.office__admin__downdiv}>
                <div className={officeAdmin.office__admin__nav}>
                    <ul>
                        <li
                            onClick={() => handleSelect('totalManager')}
                            className={selected === 'totalManager' ? officeAdmin.office__admin__nav__div__selected : officeAdmin.office__admin__nav__div}
                        >
                            전체 관리자 (2)
                        </li>
                        <li
                            onClick={() => handleSelect('humanResourceManager')}
                            className={selected === 'humanResourceManager' ? officeAdmin.office__admin__nav__div__selected : officeAdmin.office__admin__nav__div}
                        >
                            인사 관리자 (2)
                        </li>
                        <li
                            onClick={() => handleSelect('electricApprovalManager')}
                            className={selected === 'electricApprovalManager' ? officeAdmin.office__admin__nav__div__selected : officeAdmin.office__admin__nav__div}
                        >
                            전자결제 관리자 (2)
                        </li>
                        <li
                            onClick={() => handleSelect('reservationManager')}
                            className={selected === 'reservationManager' ? officeAdmin.office__admin__nav__div__selected : officeAdmin.office__admin__nav__div}
                        >
                            예약 관리자 (2)
                        </li>
                    </ul>
                </div>
                <div className={officeAdmin.office__admin__maindiv}>
                    {selected && <p>{`${selected}의 내용이 여기에 표시됩니다.`}</p>}
                </div>
            </div>
        </div>
    );
};

export default OfficeAdmin;
