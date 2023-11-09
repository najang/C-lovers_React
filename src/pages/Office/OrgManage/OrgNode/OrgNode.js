import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./OrgNode.module.css"


const OrgNode = ({ name, empCount }) => {
    return (
        <div className={styles.tree__label}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.tree__label__element}>{name}</th>
                        <td className={styles.tree__label__element}>
                            <div className={styles.tree__label__info}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </td>
                        <td className={styles.tree__label__element}><FontAwesomeIcon icon={faUser} /> {empCount}</td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default OrgNode;