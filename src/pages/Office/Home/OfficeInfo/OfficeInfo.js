import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import officeInfo from "./OfficeInfo.module.css"
import { MenuContext } from '../../Office';



const OfficeInfo = () => {
    // const [numOfWorker, setNumOFWorker] = useState(0);
    
    // useEffect(
    //     axios.get("/officer/numberOfOfficer").then((resp) =>{
    //      setNumberOfWorker(resp.data.numberOfWorker)
    //     },[])
    // )


    const {setSelectedMenu} = useContext(MenuContext);

    const onOrganizeClick = ()=>{
        setSelectedMenu("organization")
    };

    return(
        <div className={officeInfo.office__info__div}>
           <p className={officeInfo.office__info__title}>오피스 정보</p> 
           <table className={officeInfo.office__info__table}>
                <tbody>
                    <tr className={officeInfo.office__info__table__tr}>
                        <td><p className={officeInfo.office__info__table__p__index}>이름</p></td>
                        <td><p className={officeInfo.office__info__table__p__index2}>클로버산업</p></td>
                        <td><Link to="./organization"><button className={officeInfo.office__organization__button} onClick={onOrganizeClick}>조직 관리</button></Link></td>
                    </tr>
                    <tr className={officeInfo.office__info__table__tr}>
                        <td><p className={officeInfo.office__info__table__p__index}>주소</p></td>
                        <td><p className={officeInfo.office__info__table__p__index2}>clover.com</p></td>
                        <td></td>
                    </tr>
                    <tr className={officeInfo.office__info__table__tr}>
                        <td><p className={officeInfo.office__info__table__p__index}>총 인원</p></td>
                        <td><p className={officeInfo.office__info__table__p__index2}>10명</p></td>
                        <td></td>
                    </tr>
                </tbody>
           </table>
        </div>
    )
}


export default OfficeInfo;