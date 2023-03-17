import { createStore, applyMiddleware, Action, PreloadedState, combineReducers } from "redux";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
        data: userReducer,
    })
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export type AppStore = ReturnType<typeof setupStore>;
export const useTypedDispatch = () => useDispatch<ThunkAppDispatch>();