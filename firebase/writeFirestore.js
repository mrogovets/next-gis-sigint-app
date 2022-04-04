import firebase from "../firebase/firebaseConfig";

export const WriteToCloudFirestore = (data) => {
  try {
    firebase
      .firestore()
      .collection("GIS SigInt")
      .doc("Situation data")
      .set({
        markerArr_data: data,
        // markerArr_data: { stringInMap: "Hi", numberInMap: 7 },
        // array_data: ["text", 4],
        // null_data: null,
        time_stamp: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
        // geo_point: new firebase.firestore.GeoPoint(34.714322, -131.468435),
      })
      .then(alert("Data was successfully sent to cloud firestore!"));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

/*
export const WriteToCloudFirestore = () => {
  try {
    firebase
      .firestore()
      .collection("GIS SigInt")
      .doc("Situation")
      .set({
        string_data: "Maksym Rohovets",
        number_data: 2,
        boolean_data: true,
        map_data: { stringInMap: "Hi", numberInMap: 7 },
        array_data: ["text", 4],
        null_data: null,
        time_stamp: firebase.firestore.Timestamp.fromDate(
          new Date(Date.now())
        ),
        geo_point: new firebase.firestore.GeoPoint(34.714322, -131.468435),
      })
      .then(alert("Data was successfully sent to cloud firestore!"));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
*/
