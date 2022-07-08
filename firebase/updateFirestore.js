import firebase from "../firebase/firebaseConfig";
import { updateDoc } from "firebase/firestore";

export const UpdateInCloudFirestore = (markerArr_data) => {
  try {
    firebase
      .firestore()
      .collection("GIS SigInt")
      .doc("Situation data")
      .update({
        markerArr_data,
      })
      .then(alert("Data was successfully update in cloud firestore!"));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
