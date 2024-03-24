import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set ,} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAiu8WU4K2pq_ZDDUgNQUtle0Uphd4CFEM",
  authDomain: "twocups-cafe-resto.firebaseapp.com",
  databaseURL: "https://twocups-cafe-resto-default-rtdb.firebaseio.com",
  projectId: "twocups-cafe-resto",
  storageBucket: "twocups-cafe-resto.appspot.com",
  messagingSenderId: "57570929734",
  appId: "1:57570929734:web:60fdf6ebccd4f3a0892e47"
};

export const app = initializeApp(firebaseConfig);

export function register(phoneNumber, username, email,password,usertype){
    const dbb = getDatabase();
    set(ref(dbb, 'CafeApplication/users/' + phoneNumber), {
      username: username,
      email: email,
      password:password,
      phoneNumber:phoneNumber,
      usertype:usertype
    });

}







