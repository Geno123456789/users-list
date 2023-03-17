import React from 'react';
import styles from "./Hightlight.module.css";

type PropsType = {
  filter: string;
  str: string;
};


  export const Hightlight  = ({ filter, str }:PropsType):JSX.Element => {
    
    if (!filter) return <>{str}</>;
    
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);
  
    if (matchValue) {
      return <>{str.split(regexp).map((item, index, array) => {
        if (index < array.length - 1) {
          const matchingVal = matchValue.shift()
          return <>{item}<span className={styles.hightlight}>{matchingVal}</span></>
        }
        return <>{item}</>;
      })}</>
    }
     return <>{str}</>;
  }
