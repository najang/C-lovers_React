import positionDuty from "./PositionDuty.module.css"
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";


const PositionDuty = () => {

    const { setSelectedMenu } = useContext(MenuContext);
    const [positions, setPositions] = useState([]);
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

                </div>
                <div className={positionDuty.postion__rightdiv}>

                </div>
            </div>
            <table className={positionDuty.position__table}>
                <tbody>
                    {positions.map((job) => (
                        <tr className={positionDuty.position__row} key={job.id}>
                            <td className={positionDuty.position__cell}>{job.security_level}</td>
                            <td className={positionDuty.position__cell}>{job.job_name}</td>
                            <td className={positionDuty.position__cell}>
                                <button className={positionDuty.position__addButton}><FontAwesomeIcon icon={faPlus} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    )

}

export default PositionDuty;