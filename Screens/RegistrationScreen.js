import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const initialState = {
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};

export default function RegistrationScreen() {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isReady, setIsReady] = useState(false);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.borderText}>Yahoo:)</Text>
    </View>
  );

  //   return (
  //     <TouchableWithoutFeedback onPress={keyboardHide}>
  //       <View style={styles.container}>
  //         <ImageBackground
  //           style={styles.image}
  //           // source={require("../assets/images/BG@2x.jpg")}
  //           source={{ uri: "https://reactjs.org/logo-og.png" }}
  //           // style={{ width: 700, height: 700 }}
  //         >
  //           <KeyboardAvoidingView
  //             behavior={Platform.OS == "ios" ? "padding" : "height"}
  //           >
  //             <View
  //               style={{
  //                 ...styles.form,
  //                 marginBottom: isShowKeyboard ? 20 : 150,
  //                 width: dimensions,
  //               }}
  //             >
  //               <View style={styles.header}>
  //                 <Text style={styles.headerTitle}>Регистрация</Text>
  //               </View>
  //               <View>
  //                 <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
  //                 <TextInput
  //                   style={styles.input}
  //                   textAlign={"center"}
  //                   onFocus={() => setIsShowKeyboard(true)}
  //                   value={state.email}
  //                   onChangeText={(value) =>
  //                     setstate((prevState) => ({ ...prevState, email: value }))
  //                   }
  //                   placeholder="Адрес электронной почты"
  //                 />
  //               </View>
  //               <View style={{ marginTop: 20 }}>
  //                 <Text style={styles.inputTitle}>PASSWORD</Text>
  //                 <TextInput
  //                   style={styles.input}
  //                   textAlign={"center"}
  //                   secureTextEntry={true}
  //                   onFocus={() => setIsShowKeyboard(true)}
  //                   value={state.password}
  //                   onChangeText={(value) =>
  //                     setstate((prevState) => ({ ...prevState, password: value }))
  //                   }
  //                   placeholder="Пароль"
  //                 />
  //               </View>
  //               <TouchableOpacity
  //                 activeOpacity={0.8}
  //                 style={styles.btn}
  //                 onPress={keyboardHide}
  //               >
  //                 <Text style={styles.btnTitle}>Зарегистрироваться</Text>
  //               </TouchableOpacity>
  //             </View>
  //           </KeyboardAvoidingView>
  //         </ImageBackground>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,

    color: "#f0f8ff",
    fontFamily: "Roboto-Regular",
  },
  form: {
    // marginHorizontal: 40,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
    fontFamily: "DMMono-Regular",
  },
  header: {
    alignItems: "center",
    marginBottom: 120,
  },
  headerTitle: {
    fontSize: 40,
    color: "#f0f8ff",
    fontFamily: "Roboto-Medium",
  },
});

// ==========================================

// export default function RegistrationScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.borderText}>Yahoo:)</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "purple",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   borderText: {
//     paddingTop: 20,
//     paddingBottom: 20,
//     paddingLeft: 100,
//     paddingRight: 100,
//     backgroundColor: "teal",
//     borderColor: "#ab5fff",
//     borderWidth: 2,
//     borderRadius: 10,
//   },
// });
