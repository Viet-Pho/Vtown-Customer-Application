import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Block, Checkbox, Text, theme, Toast } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { useJWTAuthActions } from "../providers/AuthProvider";
import { Linking } from "react-native";

const { width, height } = Dimensions.get("screen");

const LogIn = (props) => {
  const { navigation } = props;
  const { signInUser } = useJWTAuthActions();

  // email, password
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const handleSubmitLogIn = async () => {
    signInUser({
      email: email,
      password: password,
    });
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <ScrollView>
                <Block flex={0.17} middle style={{ marginTop: 20 }}>
                  <Text color="#8898AA" size={12}>
                    Log In to existing account
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8}>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e)}
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={password}
                        onChange={(e) => setPassWord(e)}
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>

                    <Block row style={{ marginLeft: 5, marginTop: 10 }}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        Don't have account yet?
                      </Text>
                      <Text
                        size={12}
                        style={{ color: "blue", marginLeft: 10, marginTop: 1 }}
                        onPress={() => navigation.navigate("SignUp")}
                      >
                        Register
                      </Text>
                    </Block>
                    <Block row style={{ marginLeft: 5, marginTop: 10 }}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        Forget your password?
                      </Text>
                      <Text
                        size={12}
                        style={{ color: "blue", marginLeft: 10, marginTop: 1 }}
                        onPress={() =>
                          Linking.openURL(
                            "https://admin.vtowns.com.au/forget-password"
                          )
                        }
                      >
                        Reset Password
                      </Text>
                    </Block>
                    <Block middle>
                      <Button
                        onPress={handleSubmitLogIn}
                        color="primary"
                        style={styles.createButton}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Log In
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </ScrollView>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default LogIn;
