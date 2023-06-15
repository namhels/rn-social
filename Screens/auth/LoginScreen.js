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
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [isOnFocus, setIsOnFocus] = useState(styles.input);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();

    const onChange = () => {
      const width = Dimensions.get("window").width;
      setdimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener?.remove();
    };
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
  };

  const sign = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  const onFocusHandler = () => {
    setIsOnFocus(styles.inputOnFocus);
    setIsShowKeyboard(true);
  };

  const onBlurHandler = () => {
    setIsOnFocus(styles.input);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/BG-2x.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" && "padding"}
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>
              <View style={{ width: dimensions - 32 }}>
                <View>
                  <TextInput
                    style={isOnFocus}
                    onFocus={() => onFocusHandler()}
                    onBlur={() => onBlurHandler()}
                    textAlign={"center"}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    placeholder="Адреса електронної пошти"
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={isOnFocus}
                    onFocus={() => onFocusHandler()}
                    onBlur={() => onBlurHandler()}
                    textAlign={"center"}
                    secureTextEntry={true}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btn,
                    display: isShowKeyboard ? "none" : "flex",
                  }}
                  onPress={sign}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.linkToLogin,
                    display: isShowKeyboard ? "none" : "flex",
                  }}
                >
                  <Text style={styles.linkToLoginText}>
                    Немає акаунту? Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#f0f8ff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    paddingTop: 92,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
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
  inputOnFocus: {
    // ...input,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    borderColor: "#ff6c00",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
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
  linkToLogin: {
    marginTop: 16,
    alignItems: "center",
  },
  linkToLoginText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
