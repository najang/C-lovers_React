import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from './UpdateCardModal.module.css';
import { useRef, useState } from "react";
import axios from "axios";
const UpdateCardModal = ({setUpdateModalOpen, setUpdateModify,cardOne,setCardOne}) =>{

    // 모달 닫음
    const closeModal = () => {
        setUpdateModalOpen(false);
    }
    // 입력받음
    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setCardOne((prev)=>({...prev,[name]:value}));
    }
    // 수정버튼
    const updateHandler = (e) =>{
        axios.put("/api/accounting/updateCard",cardOne).then((resp)=>{
            console.log(resp);
            setUpdateModify(true);
            closeModal();
        })
    }

    const backgroundRef = useRef(null);
    const handlerClickBackground = (e)=>{
        if(e.target == backgroundRef.current){
            closeModal();
        }
    }

    return (
        <div className={style.container} onClick={handlerClickBackground}>
            <div className={style.modalBox}>
                <div className={style.top}>
                    <div className={style.title}>계좌 추가</div>
                    <div className={style.closebtn}>
                        <FontAwesomeIcon icon={faXmark} onClick={closeModal}/>
                    </div>
                </div>
                <div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            사번
                        </div>
                        <div className={style.nameInput}>
                            <input type="text" name="emp_id" defaultValue={cardOne.emp_id} onChange={changeHandler}/>
                        </div>
                    </div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            카드 회사
                        </div>
                        <div className={style.nameInput}>
                            <select name="bank" id="" className={style.selectBox}  onChange={changeHandler} defaultValue={cardOne.bank}>
                                <option value="" default>은행명</option>
                                <option value="삼성카드">삼성카드</option>
                                <option value="롯데카드">롯데카드</option>
                                <option value="하나카드">하나카드</option>
                                <option value="국민카드">국민카드</option>
                                <option value="신한카드">신한카드</option>
                                <option value="우리카드">우리카드</option>
                                <option value="NH농협은행">NH농협은행</option>
                                <option value="수협은행">수협은행</option>
                                <option value="SC제일은행">SC제일은행</option>
                            </select>
                        </div>
                    </div>
                    <div className={`${style.Box} ${style.accountBox}`}>
                        <div className={style.nameLabel}>
                            카드 번호
                        </div>
                        <div className={style.nameInput}>
                            <input type="text" name="id" defaultValue={cardOne.id}  onChange={changeHandler}/>
                        </div>
                    </div>
                    <div className={style.accountEx}>
                        <p>숫자로 구성된 4자리씩 12자리</p>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <button className={`${style.cancle} ${style.btn}`} onClick={closeModal} >취소</button>
                    <button className={`${style.save} ${style.btn}`} onClick={updateHandler}>수정</button>
                </div>
            </div>
        </div>

    );
}

export default UpdateCardModal;