import { useEffect, useState } from "react";
import firebase from "./firebaseConfig";

export const ReadFromCloudFirestore = () => {
  const [info, setInfo] = useState(null);

  const fetchData = () => {
    try {
      firebase
        .firestore()
        .collection("myData")
        .doc("my_doc")
        .get()
        .then((res) => {
          setInfo(res.data());
        });
      // alert(
      //   "Data was successfully fetched from cloud firestore! Close this alert and check console for output."
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return info;
};
