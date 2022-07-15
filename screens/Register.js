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

const { width, height } = Dimensions.get("screen");

const Register = (props) => {
  const { navigation } = props;
  const { signUpUser } = useJWTAuthActions();

  // email, password
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  // Register User Param username, email, password, first_name, last_name, age, phone_number, address
  const [firstName, setFirstName] = useState("");
  const [userName, setUsername] = useState("");

  const [age, setAge] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [address, setAddress] = useState("");

  const handleSubmitRegister = async () => {
    signUpUser({
      username: userName,
      email: email,
      password: password,
      age: parseInt(age),
      phone_number: phoneNumber,
      address: address,
      first_name: firstName,
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
                    Register Your Account
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
                    <Block width={width * 0.8}>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e)}
                        borderless
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="info-with-circle"
                            family="Entypo"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={userName}
                        onChange={(e) => setUsername(e)}
                        borderless
                        placeholder="Username"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="info-with-circle"
                            family="Entypo"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        value={age}
                        onChange={(e) => setAge(e)}
                        borderless
                        placeholder="Age"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="calendar"
                            family="Entypo"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e)}
                        type="phone-pad"
                        borderless
                        number
                        placeholder="Phone Number"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="phone"
                            family="Entypo"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={address}
                        onChange={(e) => setAddress(e)}
                        borderless
                        placeholder="Address"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="address"
                            family="Entypo"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row style={{ marginLeft: 5, marginTop: 10 }}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        Already have Account?
                      </Text>
                      <Text
                        size={12}
                        style={{ color: "blue", marginLeft: 10, marginTop: 1 }}
                        onPress={() => navigation.navigate("LogIn")}
                      >
                        Sign In
                      </Text>
                    </Block>
                    <Block middle>
                      <Button
                        onPress={() => {
                          handleSubmitRegister();
                        }}
                        color="primary"
                        style={styles.createButton}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
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

export default Register;
