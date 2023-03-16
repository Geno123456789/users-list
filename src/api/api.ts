import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux';
import { setUsers } from '../redux/userReducer';
import { UserDataType } from '../types/userType';


export const setUsersToStore =
  (): ThunkAction<Promise<unknown>, RootState, unknown, AnyAction> =>
  (dispatch) => (
   axios.get<UserDataType[]>('https://jsonplaceholder.typicode.com/users').then((resp) => {
            const allPersons = resp.data;
            dispatch(setUsers(allPersons));
        }).catch((err) => {
            throw err;
          })
          )

export const getUsers = () => (
    axios.get<UserDataType[]>('https://jsonplaceholder.typicode.com/users').then((resp) => {
            const allPersons = resp.data;
                    return allPersons;
        }).catch((err) => {
            throw err;
          })
          )          

