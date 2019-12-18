import React, { useReducer } from "react";
import {
  profile as profileReducer,
  users as usersInfoReducer,
  workPlace as workPlaceInfoReducer
} from "../reducers";

export const ProfileContext = React.createContext(null);
export const UsersInfoContext = React.createContext(null);
export const WorkPlaceInfoContext = React.createContext(null);

export const Context = ({ children }) => {
  const [profile, profileDispatch] = useReducer(profileReducer, {});
  const [usersInfo, usersInfoDispatch] = useReducer(usersInfoReducer, {});
  const [workPlaceInfo, workPlaceInfoDispatch] = useReducer(
    workPlaceInfoReducer,
    {}
  );

  return (
    <ProfileContext.Provider value={[profile, profileDispatch]}>
      <UsersInfoContext.Provider value={[usersInfo, usersInfoDispatch]}>
        <WorkPlaceInfoContext.Provider
          value={[workPlaceInfo, workPlaceInfoDispatch]}
        >
          {children}
        </WorkPlaceInfoContext.Provider>
      </UsersInfoContext.Provider>
    </ProfileContext.Provider>
  );
};
