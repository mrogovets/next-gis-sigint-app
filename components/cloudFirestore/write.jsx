import React from "react";

import firebase from "../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const WriteCloudFirestore = () => {
  // Firestore
  const db = firebase.firestore();

  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user: ", user);

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  // create document function
  const addVoteDocument = async (vote) => {
    await db.collection("votes").doc(user.uid).set({
      vote,
    });
  };

  const sendData = () => {
    // console.log("sendData");
    addVoteDocument("hello");
  };
  return (
    <React.Fragment>
      <button onClick={sendData}>Send Data to Cloud Firestore</button>
    </React.Fragment>
  );
};

export default WriteCloudFirestore;
