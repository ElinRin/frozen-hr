import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER,
  SEARCH_USER_BY_FULL_NAME,
  FETCH_ME,
  ERROR
} from "./types";
import { firebaseTools } from "../utils/firebase";

export const loginUser = async (user, dispatch) => {
  await firebaseTools.loginUser(user).catch(() => {});

  const userId = firebaseTools.currentUserId();
  if (userId) {
    dispatch({
      type: LOGIN_USER,
      payload: { userId: userId }
    });
  }
  return userId;
};

export const login = async dispatch => {
  const userId = await firebaseTools
    .login()
    .then(user => {
      dispatch({
        type: LOGIN_USER,
        payload: { userId: user.uid }
      });

      return user.uid;
    })
    .catch(e => {});

  return userId;
};

export const logoutUser = async dispatch => {
  await firebaseTools
    .logoutUser()
    .then(() =>
      dispatch({
        type: LOGOUT_USER
      })
    )
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const fetchMe = async dispatch => {
  await firebaseTools
    .fetchMe()
    .then(profile =>
      dispatch({
        type: FETCH_ME,
        payload: profile
      })
    )
    .catch(e => {
      if (e.errorMessage === "over reads") {
        dispatch({
          type: ERROR,
          payload: { error: e }
        });
      }
    });
};

export const fetchUser = async (userId, dispatch) => {
  await firebaseTools
    .fetchUser(userId)
    .then(userInfo => {
      return dispatch({
        type: FETCH_USER,
        payload: { [userId]: userInfo.data() }
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const changeStatus = async (newStatus, dispatch) => {
  await firebaseTools.changeStatus(newStatus).catch(e => {
    dispatch({
      type: ERROR,
      payload: { error: e }
    });
  });
};

export const searchUsersByName = async (name, dispatch) => {
  firebaseTools
    .searchUserByFullName(name)
    .then(userList => {
      dispatch({
        type: SEARCH_USER_BY_FULL_NAME,
        payload: { searchList: userList }
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};
