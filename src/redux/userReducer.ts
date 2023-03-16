import { UserDataType } from "../types/userType";


export type StateType = {
    users: UserDataType[];
};

export type ActionType = {
    type: string;
    payload: UserDataType;
    id: number
  };

const SET_USERS = "SET_USERS";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USERS = "UPDATE_USERS";

const initialState = {
    users: [{
        id: 1,
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
            lat: "",
            lng: "",
            },
       },
       phone: "",
       website: "",
       company: {
           name: "",
           catchPhrase: "",
           bs: "",
    },
    }],
}


const userReducer = (state: StateType= initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USERS:
          return {
            ...state,
            users: action.payload,
          };
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            };
            case UPDATE_USERS:
                return {
                  ...state,
                  users: action.payload,
                };      
        default:
          return state;
      }
}


export const setUsers = (users:UserDataType[]) => ({type:SET_USERS, payload:users});
export const removeUser = (id:number) => ({ type: REMOVE_USER, id });
export const updateUsers = (users:UserDataType[]) => ({type:UPDATE_USERS, payload:users});


export default userReducer;