// import ImagePicker from "react-native-image-crop-picker";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Block, Text, theme, Toast } from "galio-framework";
import { format as formatDate } from "date-fns";

import { InputCard, Icon, Line } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { axiosGet, axiosPost } from "../util/restAPI";
import { useProfileActions } from "../providers/ProfileProvider";
import { useJWTAuth, useJWTAuthActions } from "../providers/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { getFileInfo, isLessThanTheMB } from "../util/fileHelpers";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const genderOptions = [
  { key: 0, value: "Male" },
  { key: 1, value: "Female" },
  { key: 2, value: "Other" },
];

const VerifiedNotification = ({ confirmed, onRequestVerify }) => (
  <Block
    row
    middle
    style={{
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 10,
      backgroundColor: !!confirmed
        ? argonTheme.COLORS.SUCCESS
        : argonTheme.COLORS.ERROR,
      borderRadius: 30,
    }}
  >
    <Icon
      name={!!confirmed ? "check-circle-outline" : "error-outline"}
      family={"MaterialIcons"}
      style={{ paddingRight: 8 }}
      color={argonTheme.COLORS.WHITE}
    />
    <Text
      size={12}
      style={styles.tabTitle}
      color={argonTheme.COLORS.WHITE}
      onPress={!!confirmed ? null : onRequestVerify}
    >
      {!!confirmed ? "Verified" : "Not verified"}
    </Text>
  </Block>
);

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState({ birthday: new Date(), gender: 0 });
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [showErrorLimitFile, setShowErrorLimitFile] = useState(false);
  const [showRequestVerify, setShowRequestVerify] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const { user: userInfo } = useJWTAuth();
  const { logout, refreshUserInfo } = useJWTAuthActions();
  const {
    setProfile: setHookProfile,
    updateProfileInfo,
    initProfile,
  } = useProfileActions();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshUserInfo();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (e) {
      setRefreshing(false);
    }
  };

  const fetchUser = async () => {
    const { data: userProfile } = await axiosGet(
      `/customers/${userInfo.userId}`
    );
    setProfile(userProfile);
    initProfile(userInfo.userId, userProfile);
  };

  const onRequestVerify = async () => {
    await axiosPost('send-verify-email', { email: userInfo.email });
    setShowRequestVerify(true);
      setTimeout(() => {
        setShowRequestVerify(false);
      }, 2000);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      type: "photo",
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    const fileInfo = await getFileInfo(pickerResult.uri);

    if (
      isLessThanTheMB(fileInfo.size, 10) &&
      !pickerResult.cancelled &&
      pickerResult.base64
    ) {
      const avatar = `data:image/png;base64,${pickerResult.base64}`;
      setProfile({ ...profile, avatar });
      setHookProfile("avatar", avatar);
      setShowUploadSuccess(true);
      setTimeout(() => {
        setShowUploadSuccess(false);
      }, 2000);
      await updateProfileInfo({ avatar });
    } else {
      setShowErrorLimitFile(true);
      setTimeout(() => {
        setShowErrorLimitFile(false);
      }, 2000);
    }
  };

  return (
    <Block flex style={styles.profile}>
      <Toast
        isShow={showErrorLimitFile}
        color="error"
        fadeInDuration={500}
        fadeOutDuration={500}
        positionIndicator="bottom"
        positionOffset={48}
      >
        Choose file less than 10Mb
      </Toast>
      <Toast
        isShow={showUploadSuccess}
        color="success"
        fadeInDuration={500}
        fadeOutDuration={500}
        positionIndicator="bottom"
        positionOffset={48}
      >
        Upload avatar successfully.
      </Toast>
      <Toast
        isShow={showRequestVerify}
        color="success"
        fadeInDuration={500}
        fadeOutDuration={500}
        positionIndicator="bottom"
        positionOffset={48}
      >
        We sent a verify email to you. Please check your email. 
      </Toast>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <TouchableOpacity onPress={selectImage}>
                  <Image
                    source={
                      profile.avatar
                        ? { uri: profile.avatar || "" }
                        : Images.VtownLogo
                    }
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                  <Text
                    h4
                    style={{ marginBottom: theme.SIZES.BASE / 2 }}
                    color={argonTheme.COLORS.DEFAULT}
                  >
                    {profile.firstName} {profile.lastName}
                  </Text>
                  <VerifiedNotification
                    confirmed={
                      userInfo && userInfo.confirmed && !!userInfo.confirmed
                    }
                    onRequestVerify={onRequestVerify}
                  />
                </Block>
                <InputCard
                  title={"Personal Info"}
                  onPressAction={() =>
                    navigation.navigate("PersonalInfo", {
                      customerId: userInfo.userId,
                      profile,
                    })
                  }
                >
                  <Line
                    iconName="cake"
                    iconFamily="MaterialIcons"
                    style={styles.line}
                    title={"Birthday"}
                    value={formatDate(new Date(profile.birthday), "dd/MM/yyyy")}
                  ></Line>
                  <Line
                    iconName="male-female"
                    iconFamily="Foundation"
                    style={styles.line}
                    title={"Gender"}
                    value={
                      genderOptions.find(
                        (gender) => gender.key === profile.gender
                      ).value
                    }
                  ></Line>
                  <Line
                    iconName="check-circle"
                    iconFamily="MaterialIcons"
                    iconColor={argonTheme.COLORS.SUCCESS}
                    style={styles.line}
                    title={"Active"}
                  ></Line>
                </InputCard>
                <InputCard
                  title={"Contact Info"}
                  onPressAction={() =>
                    navigation.navigate("ContactInfo", {
                      customerId: userInfo.userId,
                      profile,
                    })
                  }
                >
                  <Line
                    iconName="mail"
                    iconFamily="Feather"
                    style={styles.line}
                    title={"Email"}
                    value={profile.email}
                  ></Line>
                  <Line
                    iconName="phone"
                    iconFamily="AntDesign"
                    style={styles.line}
                    title={"Phone"}
                    value={profile.phoneNumber}
                  ></Line>
                  <Line
                    iconName="address"
                    iconFamily="Entypo"
                    style={styles.line}
                    title={"Address"}
                    value={profile.address}
                  ></Line>
                </InputCard>
                <InputCard style={{ marginBottom: 0 }}>
                  <Line
                    iconColor={argonTheme.COLORS.ERROR}
                    iconName="power"
                    iconFamily="Feather"
                    value={"Log out"}
                    onPress={logout}
                  ></Line>
                </InputCard>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    // padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.GREY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 0,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER,
  },
  line: {
    marginBottom: 10,
  },
});

export default Profile;
