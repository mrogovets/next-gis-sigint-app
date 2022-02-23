import React from "react";
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const WriteCloudFirestore = () => {
  const sendData = () => {
    try {
      const firestore = getFirestore();
      console.log(firestore);
      // .collection("myCollection")
      // .doc("my_document")
      // .set({
      //   string_data: "Charlie",
      //   number: 1979,
      //   array_data: ["GisSigint", 2021],
      //   time_stamp: firebase.firestore.TimeStamp.fromDate(new Date.now()),
      // })
      // .then(alert("Data was successfully sent to cloudstore!"));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <button onClick={sendData}>Send Data to Cloud Firestore</button>
    </React.Fragment>
  );
};

export default WriteCloudFirestore;
