// OrgNode 컴포넌트
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./OrgNode.module.css";

const OrgNode = ({ name, empCount}) => {
    // 컴포넌트 렌더링
    return (
        <div className={styles.tree__label}>
            <table>
                <tbody>
                    <tr>
                        <th className={styles.tree__label__element}>{name}</th>
                        <td className={styles.tree__label__element}>
                            <div className={styles.tree__label__info}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </td>
                        <td className={styles.tree__label__element}>
                            <FontAwesomeIcon icon={faUser} /> {empCount}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrgNode;
