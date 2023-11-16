import style from './UpdateModal.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from 'axios';

const UpdateModal = ({ setUpdateModalOpen, setUpdateModify, accountOneList,setAccountOneList }) => {

    // 모달끄기
    const closeModal = () => {
        setUpdateModalOpen(false);
    }
    // Ref 생성: 함수형 컴포넌트에서 dom 요소 접근시 사용됨
    const backgroundRef = useRef(null);
    // 모달 외부 클릭시 끄기 처리
    const handlerClickBackground = (e) => {
        if (e.target === backgroundRef.current) {
            closeModal();
        }
    }

    // 값 변경할때마다
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccountOneList(prev=>({...prev,[name]:value}));
       console.log(accountOneList);
    }

    const updateHandler = (e) => {
        axios.put("/api/accounting",accountOneList).then((resp)=>{
            setUpdateModify(true);
            closeModal();
        })
    }


    return (
        <div className={style.container} ref={backgroundRef} onClick={handlerClickBackground}>
            <div className={style.modalBox}>
                <div className={style.top}>
                    <div className={style.title}>계좌 추가</div>
                    <div className={style.closebtn} onClick={closeModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            사번
                        </div>
                        <div className={style.nameInput}>
                            <input type="text" name="emp_id" defaultValue={accountOneList.emp_id} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            은행명
                        </div>
                        <div className={style.nameInput}>
                            <select name="bank" id="" className={style.selectBox} defaultValue={accountOneList.bank} onChange={handleChange}>
                                <option value="" default>은행명</option>
                                <option value="하나은행">하나은행</option>
                                <option value="국민은행">국민은행</option>
                                <option value="신한은행">신한은행</option>
                                <option value="우리은행">우리은행</option>
                                <option value="우체국">우체국</option>
                                <option value="NH농협은행">NH농협은행</option>
                                <option value="수협은행">수협은행</option>
                                <option value="SC제일은행">SC제일은행</option>
                            </select>
                        </div>
                    </div>
                    <div className={`${style.Box} ${style.accountBox}`}>
                        <div className={style.nameLabel}>
                            계좌번호
                        </div>
                        <div className={style.nameInput}>
                            <input type="text" name="id" defaultValue={accountOneList.id} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={style.accountEx}>
                        <p>숫자만 입력하세요.(12 ~ 14글자)</p>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <button className={`${style.cancle} ${style.btn}`} onClick={closeModal}>취소</button>
                    <button className={`${style.save} ${style.btn}`} onClick={updateHandler}>수정</button>
                </div>
            </div>
        </div>

    );
}

export default UpdateModal;