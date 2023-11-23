import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from './AddCardModal.module.css';
import { useRef, useState } from "react";
import axios from "axios";

const AddCardModal = ({setAddModalOpen, setAddModify}) =>{

    // 신용카드 regex
    const cardRegex = /^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$/;
    // 카드 regex 결과
    const [regexResult, setRegexResult] = useState(false);

    const closeModal = () => {
        setAddModalOpen(false);
    }
    // Ref 
    const backgroundRef = useRef(null);
    const handlerClickBackground = (e) =>{
        if(e.target === backgroundRef.current){
            closeModal();
        }
    }
    // 카드추가
    const [addCard, setAddCard] = useState({});
    let result = false;
    // 입력 시 카드 리스트 상태변화
    const handleChange = (e) => {
        const {name,value} = e.target;
        if([name] == "id"){
            result = cardRegex.test(e.target.value);
            if(result){
                setAddCard((prev)=>({...prev,[name]:value}));
                setRegexResult(true);
            }
        }else{
            setAddCard((prev)=>({...prev,[name]:value}));
        }
    }
    // 저장버튼
    const saveHandler = () =>{
        if(!regexResult){
            alert("카드 번호를 다시 입력해주세요.");
            return;
        }

        axios.post("/api/accounting/cardInsert",addCard).then((resp)=>{
            console.log(resp.data);
            if(resp.data == "성공"){
                closeModal();
                setAddModify(true);
            }else{
                alert(resp.data);
            }
        }).catch(e=>{
            console.log("실패");
        })
    }
    return (
        <div className={style.container} ref={backgroundRef} onClick={handlerClickBackground}>
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
                            <input type="text" name="emp_id" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={style.Box}>
                        <div className={style.nameLabel}>
                            카드회사
                        </div>
                        <div className={style.nameInput}>
                            <select name="bank" id="" className={style.selectBox} onChange={handleChange}>
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
                            카드번호
                        </div>
                        <div className={style.nameInput}>
                            <input type="text" name="id" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={style.accountEx}>
                        <p>숫자로 구성된 4자리씩 16자리</p>
                    </div>
                </div>
                <div className={style.btnBox}>
                    <button className={`${style.cancle} ${style.btn}`} onClick={closeModal}>취소</button>
                    <button className={`${style.save} ${style.btn}`} onClick={saveHandler}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default AddCardModal;