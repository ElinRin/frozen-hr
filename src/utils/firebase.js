import firebase from "firebase";
import { FIREBASE_CONFIG } from "../config";

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseFS = firebaseApp.firestore();

const usersFS = firebaseFS.collection("users");
const workPlacesFS = firebaseFS.collection("workPlaces");
const parkingFS = firebaseFS.collection("parking");
const daysOffFS = firebaseFS.collection("daysOff");
const eventsFS = firebaseFS.collection("events");
let count = 0;

export const firebaseTools = {
  login: () => {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        auth => {
          if (auth) {
            resolve(firebaseAuth.currentUser);
          } else {
            reject();
          }
        },
        error => {
          reject(error);
        }
      );
    });
  },

  loginUser: user => {
    if (count < 1000) {
      count++;

      return firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  logoutUser: () => {
    if (count < 1000) {
      count++;

      return firebaseAuth.signOut().then(() => ({
        success: 1,
        message: "logout"
      }));
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  fetchMe: () => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      if (userId) {
        return usersFS
          .doc(userId)
          .get()
          .then(profile => {
            return { userId, ...profile.data() };
          });
      } else {
        return Promise.reject(
          new Error({
            errorCode: 404,
            errorMessage: "current user not found"
          })
        );
      }
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  currentUser: () => {
    if (count < 1000) {
      count++;

      return firebaseAuth.currentUser;
    }
    return null;
  },

  currentUserId: () => {
    if (count < 1000) {
      count++;
      return firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
    }
    return () => null;
  },

  fetchUser: userId => {
    if (count < 1000) {
      count++;

      return usersFS
        .doc(userId)
        .get()
        .then(userInfo => userInfo);
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  changeStatus: newStatus => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      return usersFS.doc(userId).update({
        status: newStatus
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  searchUserByFullName: fullName => {
    if (count < 1000) {
      count++;

      return usersFS
        .where("fullName", "==", fullName)
        .get()
        .then(userList =>
          userList.docs.map(a => ({ userId: a.id, ...a.data() }))
        );
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  fetchWorkPlace: workPlaceId => {
    if (count < 1000) {
      count++;

      return workPlacesFS
        .doc(workPlaceId)
        .get()
        .then(workPlaceInfo => workPlaceInfo.data());
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  fetchWorkPlaceList: () => {
    if (count < 1000) {
      count++;

      return workPlacesFS
        .get()
        .then(workPlaceList =>
          workPlaceList.docs.map(a => ({ id: a.id, ...a.data() }))
        );
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  reserveWorkPlace: workPlaceId => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      workPlacesFS.doc(workPlaceId).update({
        userId: userId
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  searchWorkPlaceByUserId: userId => {
    if (count < 1000) {
      count++;

      return workPlacesFS
        .where("userId", "==", userId)
        .get()
        .then(userList => userList.docs.map(a => a.data()));
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  searchWorkPlaceByProperties: properties => {
    if (count < 1000) {
      count++;

      let wp = workPlacesFS;
      for (let key in properties) {
        wp = wp.where(key, "==", properties[key]);
      }
      return wp.get().then(workPlaceList => workPlaceList);
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  fetchParking: parkingId => {
    if (count < 1000) {
      count++;

      return parkingFS
        .doc(parkingId)
        .get()
        .then(parkingInfo => parkingInfo);
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  fetchParkingList: () => {
    if (count < 1000) {
      count++;

      return parkingFS
        .orderBy("num")
        .get()
        .then(parkingList => {
          let data = parkingList.docs.map(a => {
            let res = a.data();
            res.id = a.id;
            return res;
          });
          return data;
        });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  reserveParking: parkingId => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      parkingFS.doc(parkingId).update({
        userId: userId
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  daysOff: () => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      if (userId) {
        return daysOffFS
          .doc(userId)
          .get()
          .then(profile => {
            return { userId, ...profile.data() };
          });
      }
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  events: () => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      return eventsFS
        .where("userId", "==", userId)
        .get()
        .then(events => ({
          userId: userId,
          events: events.docs.map(a => a.data())
        }));
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  dayOffUpdate: (label, number) => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      return daysOffFS.doc(userId).update({
        [label]: number
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  newEvent: event => {
    if (count < 1000) {
      count++;

      const userId = firebaseAuth.currentUser && firebaseAuth.currentUser.uid;
      return eventsFS.add({
        userId: userId,
        ...event
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  },

  allUsers: () => {
    if (count < 1000) {
      count++;

      return usersFS.get().then(userList => {
        return userList.docs.map(a => ({ userId: a.id, ...a.data() }));
      });
    }
    return Promise.reject(
      new Error({
        errorCode: 404,
        errorMessage: "over reads"
      })
    );
  }
};
