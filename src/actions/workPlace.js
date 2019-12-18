import {
  FETCH_WORK_PLACE,
  FETCH_WORK_PLACE_LIST_BY_FLOOR,
  RESERVE_WORK_PLACE,
  SEARCH_WORK_PLACE_BY_PROPERTIES,
  SEARCH_WORK_PLACE_BY_USER_ID,
  ERROR
} from "./types";
import { firebaseTools } from "../utils/firebase";

export const fetchWorkPlace = async (workPlaceId, dispatch) => {
  await firebaseTools
    .fetchWorkPlace(workPlaceId)
    .then(workPlaceInfo => {
      return dispatch({
        type: FETCH_WORK_PLACE,
        payload: workPlaceInfo.data()
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const fetchWorkPlaceList = async dispatch => {
  await firebaseTools
    .fetchWorkPlaceList()
    .then(workPlaceList => {
      return dispatch({
        type: FETCH_WORK_PLACE_LIST_BY_FLOOR,
        payload: { workPlaceList: workPlaceList }
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const reserveWorkPlace = async (workPlaceId, dispatch) => {
  await firebaseTools
    .reserveWorkPlace(workPlaceId)
    .then(() =>
      dispatch({
        type: RESERVE_WORK_PLACE
      })
    )
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const searchWorkPlaceByUserId = async (userId, dispatch) => {
  await firebaseTools
    .searchWorkPlaceByUserId(userId)
    .then(workPlaceInfo => {
      return dispatch({
        type: SEARCH_WORK_PLACE_BY_USER_ID,
        payload: { userWorkPlace: workPlaceInfo[0] }
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};

export const searchWorkPlaceByProperties = async (properties, dispatch) => {
  await firebaseTools
    .searchWorkPlaceByProperties(properties)
    .then(workPlaceList => {
      return dispatch({
        type: SEARCH_WORK_PLACE_BY_PROPERTIES,
        payload: workPlaceList.data()
      });
    })
    .catch(e =>
      dispatch({
        type: ERROR,
        payload: { error: e }
      })
    );
};
