import React from "react";
import styles from "./Popup.module.css";


export type PopupProps = {
  address: string;
  company: string;
  onClose?: () => void;
};

export const Popup: React.FC<PopupProps> = ({
  address,
  company,
  onClose,
}) => {
 
  return  (
    <div  className={styles.wrapper}>
      <div className={styles.content}>
        <p><span>Company: </span>{company}</p>
        <p><span>City: </span>{address}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) 
};
