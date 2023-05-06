import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Icon } from "react-native-elements";
import { colors } from "../global/styles";
import { firebase } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const SettingsScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setFirstName(snapshot.data().firstName);
          setLastName(snapshot.data().lastName);
          setPhoneNumber(snapshot.data().phoneNumber);
          setEmail(snapshot.data().email);
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  //   if (!result.canceled && result.assets.length > 0) {
  //     const response = await fetch(result.uri);
  //     const blob = await response.blob();
  //     const imageName = result.uri.substring(result.uri.lastIndexOf("/") + 1);
  //     const ref = firebase.storage().ref().child(imageName);
  
  //     try {
  //       await ref.put(blob);
  //       const url = await ref.getDownloadURL();
  //       setImage(url);
  //       Alert.alert("Image uploaded");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  
  //   setModalVisible(false);
  // };
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);

    setModalVisible(false);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const imageName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(imageName);

    try {
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setImage(url);
      Alert.alert("Image uploaded");
    } catch (e) {
     // console.log(e);
    }
    setUploading(false);
    Alert.alert("Image uploaded");
    console.log("Image uploaded");
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <TouchableOpacity
          style={styles.view1}
          onPress={() => navigation.goBack()}
        >
          <View>
            <Icon
              type="material-community"
              name="arrow-left"
              color={colors.grey1}
              size={32}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text1}>User Account</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account Info</Text>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar
            rounded
            avatarStyle={{}}
            size={80}
            source={
              image
                ? { uri: image }
                : require("../../app/assets/blankProfilePic.jpeg")
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.basicContainer}>
        <Text style={styles.basic}>Basic Info</Text>
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.detailsText}>Name</Text>
          <Text style={{ fontSize: 15, color: "gray" }}>
            {firstName} {lastName}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <View style={styles.detailsContainer}>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.detailsText}>Email</Text>
          <Text style={{ fontSize: 15, color: "gray" }}>{email}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <View style={styles.detailsContainer}>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.detailsText}>Phone Number</Text>
          <Text style={{ fontSize: 15, color: "gray" }}>{phoneNumber}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.modalHeader}>Profile Picture</Text>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={50} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.line2} />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity  onPress={() => {pickImage(); uploadImage();
}} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Update Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "white", fontSize: 20, marginTop: 15 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  titleContainer: {
    marginLeft: 20,
    marginTop: 40,
  },
  basic: {
    fontSize: 20,
    fontWeight: "bold",
  },
  basicContainer: {
    marginLeft: 20,
    marginTop: 30,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    height: 90,
  },
  line: {
    borderBottomColor: "#97978F",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  line2: {
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginLeft: 20,
    marginRight: 20,
  },
  text1: {
    fontSize: 20,
    color: "white",
    marginRight: 20,
    marginTop: 40,
  },
  view1: {
    top: 30,
    left: 12,
    backgroundColor: "black",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8,
  },
  imageContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  detailsContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  detailsText: {
    fontSize: 20,
  },

  modalHeader: {
    fontSize: 15,
    marginLeft: "auto",
    color: "white",
    padding: 10,
  },
  modalContent: {},
  modalButtonText: {
    color: "black",
    fontSize: 20,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: "35%",
    width: "100%",
    marginTop: "auto",
    borderRadius: 20,
    position: "relative",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.grey1,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  modalButton: {
    width: 250,
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  closeModal: {
    alignItems: "flex-end",
    marginLeft: 180,
    backgroundColor: "black",
  },
});

// const handleChoosePhoto = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync();
//   if (!result.canceled) {
//     setImage(result.uri);
//   }
// };

// const handleChoosePhoto = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync();
//   if (!result.canceled) {
//     const response = await fetch(result.uri);
//     const blob = await response.blob();

//     // Upload image to Firebase Storage
//     const storageRef = firebase.storage().ref();
//     const imageName = `${firebase.auth().currentUser.uid}-profile-picture`;
//     const imageRef = storageRef.child(`images/${imageName}`);
//     await imageRef.put(blob);

//     // Get download URL for uploaded image
//     const downloadURL = await imageRef.getDownloadURL();

//     // Update user's profile picture in Firebase Firestore
//     await firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .update({ profilePicture: downloadURL });

//     // Update image state to render new profile picture
//     setImage(downloadURL);

//     // Close modal
//     setModalVisible(false);
//   }
// };
