import React, { useEffect, useState } from 'react';

import styles from "./Hightlight.module.css";

type PropsType = {
  filter: string;
  str: string;
};

// @ts-ignore
  export const Hightlight:React.FC<PropsType>  = ({ filter, str }) => {
    
    if (!filter) return str;
    
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);
  
    if (matchValue) {
      return str.split(regexp).map((s, index, array) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return <>{s}<span className={styles.hightlight}>{c}</span></>
        }
        return s;
      })
    }
    return str;
  }