import firebase from "../firebase/firebaseConfig";

export const WriteToCloudFirestore = (
  markerArr_data,
  collectionSigIntStripPath_data,
  collectionLineDividePath_data,
  collectionDistanceSigIntHFPath_data,
  collectionDistanceSigIntUHFGndPath_data,
  collectionDistanceSigIntVHFAirPath_data,
  collectionDistanceSigIntRdrAirPath_data,
  collectionSectorSigIntPath_data
) => {
  //--------transform Array of collectionSigIntStripPath_data -----
  let collectionSigIntStripPath_data_joinArr = new Array();

  if (collectionSigIntStripPath_data.length) {
    for (let i = 0; i < collectionSigIntStripPath_data.length; i++) {
      collectionSigIntStripPath_data_joinArr =
        collectionSigIntStripPath_data_joinArr.concat(
          collectionSigIntStripPath_data[i][0]
        );
    }
  }
  console.log(
    "collectionSigIntStripPath_data from writeFirestore.jsx: ",
    JSON.stringify(collectionSigIntStripPath_data)
  );
  // console.log(
  //   "collectionSigIntStripPath_data_joinArr: ",
  //   collectionSigIntStripPath_data_joinArr
  // );
  //--------\transform Array of collectionSigIntStripPath_data -----
  //--------transform Array of collectionLineDividePath_data -----
  let collectionLineDividePath_data_joinArr = new Array();

  if (collectionLineDividePath_data.length) {
    for (let i = 0; i < collectionLineDividePath_data.length; i++) {
      collectionLineDividePath_data_joinArr =
        collectionLineDividePath_data_joinArr.concat(
          collectionLineDividePath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionLineDividePath_data_joinArr: ",
  //   collectionLineDividePath_data_joinArr
  // );
  //--------\transform Array of collectionLineDividePath_data -----
  //--------transform Array of collectionDistanceSigIntHFPath_data -----
  let collectionDistanceSigIntHFPath_data_joinArr = new Array();

  if (collectionDistanceSigIntHFPath_data.length) {
    for (let i = 0; i < collectionDistanceSigIntHFPath_data.length; i++) {
      collectionDistanceSigIntHFPath_data_joinArr =
        collectionDistanceSigIntHFPath_data_joinArr.concat(
          collectionDistanceSigIntHFPath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionDistanceSigIntHFPath_data_joinArr: ",
  //   collectionDistanceSigIntHFPath_data_joinArr
  // );
  //--------\transform Array of collectionDistanceSigIntHFPath_data -----
  //--------transform Array of collectionDistanceSigIntUHFGndPath_data -----
  let collectionDistanceSigIntUHFGndPath_data_joinArr = new Array();

  if (collectionDistanceSigIntUHFGndPath_data.length) {
    for (let i = 0; i < collectionDistanceSigIntUHFGndPath_data.length; i++) {
      collectionDistanceSigIntUHFGndPath_data_joinArr =
        collectionDistanceSigIntUHFGndPath_data_joinArr.concat(
          collectionDistanceSigIntUHFGndPath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionDistanceSigIntUHFGndPath_data_joinArr: ",
  //   collectionDistanceSigIntUHFGndPath_data_joinArr
  // );
  //--------\transform Array of collectionDistanceSigIntUHFGndPath_data -----
  //--------transform Array of collectionDistanceSigIntVHFAirPath_data -----
  let collectionDistanceSigIntVHFAirPath_data_joinArr = new Array();

  if (collectionDistanceSigIntVHFAirPath_data.length) {
    for (let i = 0; i < collectionDistanceSigIntVHFAirPath_data.length; i++) {
      collectionDistanceSigIntVHFAirPath_data_joinArr =
        collectionDistanceSigIntVHFAirPath_data_joinArr.concat(
          collectionDistanceSigIntVHFAirPath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionDistanceSigIntVHFAirPath_data_joinArr: ",
  //   collectionDistanceSigIntVHFAirPath_data_joinArr
  // );
  //--------\transform Array of collectionDistanceSigIntVHFAirPath_data -----
  //--------transform Array of collectionDistanceSigIntRdrAirPath_data -----
  let collectionDistanceSigIntRdrAirPath_data_joinArr = new Array();

  if (collectionDistanceSigIntRdrAirPath_data.length) {
    for (let i = 0; i < collectionDistanceSigIntRdrAirPath_data.length; i++) {
      collectionDistanceSigIntRdrAirPath_data_joinArr =
        collectionDistanceSigIntRdrAirPath_data_joinArr.concat(
          collectionDistanceSigIntRdrAirPath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionDistanceSigIntVHFAirPath_data_joinArr: ",
  //   collectionDistanceSigIntVHFAirPath_data_joinArr
  // );
  //--------\transform Array of collectionDistanceSigIntRdrAirPath_data -----
  //--------transform Array of collectionSectorSigIntPath_data -----
  let collectionSectorSigIntPath_data_joinArr = new Array();

  if (collectionSectorSigIntPath_data.length) {
    for (let i = 0; i < collectionSectorSigIntPath_data.length; i++) {
      collectionSectorSigIntPath_data_joinArr =
        collectionSectorSigIntPath_data_joinArr.concat(
          collectionSectorSigIntPath_data[i][0]
        );
    }
  }
  // console.log(
  //   "collectionDistanceSigIntVHFAirPath_data_joinArr: ",
  //   collectionDistanceSigIntVHFAirPath_data_joinArr
  // );
  //--------\transform Array of collectionSectorSigIntPath_data -----

  try {
    firebase
      .firestore()
      .collection("GIS SigInt")
      .doc("Situation data")
      .set({
        markerArr_data,
        collectionSigIntStripPath_data: JSON.stringify(
          collectionSigIntStripPath_data
        ),
        // collectionSigIntStripPath_data,
        collectionLineDividePath_data: collectionLineDividePath_data_joinArr,
        collectionDistanceSigIntHFPath_data:
          collectionDistanceSigIntHFPath_data_joinArr,
        collectionDistanceSigIntUHFGndPath_data:
          collectionDistanceSigIntUHFGndPath_data_joinArr,
        collectionDistanceSigIntVHFAirPath_data:
          collectionDistanceSigIntVHFAirPath_data_joinArr,
        collectionDistanceSigIntRdrAirPath_data:
          collectionDistanceSigIntRdrAirPath_data_joinArr,
        collectionSectorSigIntPath_data:
          collectionSectorSigIntPath_data_joinArr,
        time_stamp: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
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
