import firebase from "./firebaseConfig";

export const ReadFromCloudFirestore = () => {
  let data;
  try {
    firebase
      .firestore()
      .collection("myData")
      .doc("my_doc")
      .onSnapshot((doc) => {
        console.log(doc.data());
      });
    alert(
      "Data was successfully fetched from cloud firestore! Close this alert and check console for output."
    );
  } catch (error) {
    console.log(error);
  }
};
