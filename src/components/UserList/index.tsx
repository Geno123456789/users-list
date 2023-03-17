import React, { useCallback, useEffect, useState } from 'react';
import { getUsers, setUsersToStore } from '../../api/api';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { useTypedDispatch } from '../../redux';
import { removeUser, updateUsers } from '../../redux/userReducer';
import { FaTrashAlt } from 'react-icons/fa';
import { UserDataType } from '../../types/userType';
import { Hightlight } from '../Hightlight';
import { Popup } from '../Popup';
import { Spinner } from '../Spinner';
import styles from "./UserList.module.css";



export const UserList  = () => {
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
      <form>
        <input 
          type="text" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          placeholder="Search" 
          className={styles.search}/>
        <button onClick={resetHandler}>Reset</button>
      </form>
      {!persons[0]?.name ? <Spinner /> : <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
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
                      <button className={styles.deleteBtn} onClick={()=> onRemoveUser(person.id)}><FaTrashAlt/></button>
                    </tr>
                  )
                }
              </tbody>
      </table>}
            {isOpenPopup && <Popup 
            address={address} 
            company={company} 
            onClose={handleClosePopup} />}
    </div>
  );
};