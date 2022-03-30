import React from "react";

const WriteCloudFirestore = () => {
  const sendData = () => {
    console.log("sendData");
  };
  return (
    <React.Fragment>
      <button onClick={sendData}>Send Data to Cloud Firestore</button>
    </React.Fragment>
  );
};

export default WriteCloudFirestore;
