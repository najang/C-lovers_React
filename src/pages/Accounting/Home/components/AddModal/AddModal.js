import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import style from "./AddModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";

const AddModal = ({ setAddModalOpen, setAddModify }) => {

    const navi = useNavigate();

    // 계좌번호 regex
    const accountRegex = /^\d{12,14}$/;

    // 계좌 추가
    const [addAccountList, setAddAccountList] = useState({});

    // 계좌 regex 결과
    const [regexResult , setRegexResult] = useState(false);

    // 계좌 추가 모달창에서 입력
    let result = false;
    const handleChange = (e) => {
        const { name, value } = e.target;
        if ([name] == "id") {
            result = accountRegex.test(e.target.value);
            if(result){
                setAddAccountList((prev) => ({ ...prev, [name]: value }));
                setRegexResult(true);
            }

        } else {
            setAddAccountList((prev) => ({ ...prev, [name]: value }));
        }

    }

    // 모달끄기
    const closeModal = () => {
        setAddModalOpen(false);
    }

    // Ref 생성: 함수형 컴포넌트에서 dom 요소 접근시 사용됨
    const backgroundRef = useRef(null);
    // 모달 외부 클릭시 끄기 처리
    const handlerClickBackground = (e) => {
        if (e.target === backgroundRef.current) {
            closeModal();
        }
    }

    // 저장 버튼
    const addAccountHandle = () => {
        if(!regexResult){
            alert("계좌번호를 다시 입력해주세요.");
            return;
        }

        axios.post("/api/accounting", addAccountList).then((resp) => {
            console.log("삽입성공");
            closeModal();
            setAddModify(true);
        }).catch(e => {
            console.log("실패");
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
                            <input type="text" name="emp_id" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            은행명
                        </div>
                        <div className={style.nameInput}>
                            <select name="bank" id="" className={style.selectBox} onChange={handleChange}>
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
                            <input type="text" name="id" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={style.accountEx}>
                        <p>숫자만 입력하세요.(12 ~ 14글자)</p>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <button className={`${style.cancle} ${style.btn}`} onClick={closeModal}>취소</button>
                    <button className={`${style.save} ${style.btn}`} onClick={addAccountHandle}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default AddModal;