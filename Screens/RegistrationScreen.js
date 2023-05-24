import React, { useState, useEffect, useCallback } from "react";
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
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  // const [dimensions, setdimensions] = useState(
  //   Dimensions.get("window").width - 16 * 2
  // );

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();

    // const onChange = () => {
    //   const width = Dimensions.get("window").width - 16 * 2;

    //   setdimensions(width);
    // };
    // Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/BG-2x.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              // style={styles.form}
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 194 : 78,
                width: 350,
                // width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder="Логин"
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адрес электронной почты"
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Пароль"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
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
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    height: 50,
    borderRadius: 8,

    color: "#bdbdbd",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  form: {
    paddingTop: 92,

    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginHorizontal: 32,
    alignItems: "center",
  },
  btn: {
    borderRadius: 100,
    borderWidth: 1,
    height: 51,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#ff6c00",
      },
      android: {
        backgroundColor: "#ff6c00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#ff6c00" : "#ffffff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
});
