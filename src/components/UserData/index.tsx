import React, { useCallback, useEffect, useState } from 'react';
import { getUsers, setUsersToStore } from '../../api/api';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { useTypedDispatch } from '../../redux';
import { removeUser, updateUsers } from '../../redux/userReducer';
import { UserDataType } from '../../types/userType';
import { Hightlight } from '../Hightlight';
import { Popup } from '../Popup';
import styles from "./UserData.module.css";


export const UserData  = () => {
  const dispatch = useTypedDispatch();
  const persons: UserDataType[] = useTypedSelector((state) => state.data['users']);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUser, setFilteredUser] = useState<UserDataType[]>([]);
  const [reset, setReset] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [address, setAddress] = useState("");
  const [company, setCompony] = useState("");
 
  useEffect(()=> {
     dispatch(setUsersToStore())
  }, [])

  useEffect(()=> {
    setFilteredUser(filter)
    }, [searchValue ])
  
  
  useEffect(() => {
      getUsers().then((data) => {
        setFilteredUser(data);
      });
    }, [reset]);


  const onRemoveUser = (id:number): void => {
    dispatch(removeUser(id))
}

const filter = persons.filter(user => {
    return user.name.toLowerCase().includes(searchValue) || 
    user.username.toLowerCase().includes(searchValue) || 
    user.email.toLowerCase().includes(searchValue);
});

const resetHandler = () => {
  setSearchValue("");
  setReset(true);
  dispatch(updateUsers(filteredUser))
}

const light = useCallback((str:string) => {
  return <Hightlight filter={searchValue} str={str} />
}, [searchValue])


const handleOpenPopup = (address:string, company:string) => {
  setIsOpenPopup(true);
  setAddress(address);
  setCompony(company);
}

const handleClosePopup = () => {
  setIsOpenPopup(false);
}

  return  (
    <div>
      <div className="search">
        <input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          type="text" 
          placeholder="Search" 
          className="search-input"/>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
            </tr>
          </thead>
              <tbody>
                {
                  (searchValue ? filteredUser : persons).map((person) =>
                    <tr key={person.id}>
                      <td onClick={() => handleOpenPopup(person.address.city, person.company.name)}>{light(person.name)}</td>
                      <td onClick={() => handleOpenPopup(person.address.city, person.company.name)}>{light(person.username)}</td>
                      <td onClick={() => handleOpenPopup(person.address.city, person.company.name)}>{light(person.email)}</td>
                      <button onClick={()=> onRemoveUser(person.id)}>delete</button>
                    </tr>
                  )
                }
              </tbody>
      </table>
            {isOpenPopup && <Popup 
            className={styles.backdrop} 
            address={address} 
            company={company} 
            onClose={handleClosePopup} />}
    </div>
  );
};