import React from "react";

import styles from "./Popup.module.css";


export type PopupProps = {
  address: string;
  company: string;
  onClose?: () => void;
  className?: string;
};

export const Popup: React.FC<PopupProps> = ({
  address,
  company,
  onClose,
  className
}) => {
 
  return  (
    <div  className={styles.wrapper}>
        <p>{address}</p>
        <p>{company}</p>
        <button onClick={onClose}>Close</button>
    
    </div>
  ) 
};
