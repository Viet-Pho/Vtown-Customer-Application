import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, theme } from "galio-framework";
import { Input, Icon } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { useProfile, useProfileActions } from "../../providers/ProfileProvider";

const { width, height } = Dimensions.get("screen");

const ContactInfo = () => {
  const { profileInfo } = useProfile();
  const { setProfile } = useProfileActions();

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.BackGround}
          style={styles.profileContainer}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block style={styles.info}>
                <Input
                  placeholder="Email"
                  value={profileInfo.firstName}
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="mail"
                      family="Feather"
                    />
                  }
                  iconSize={14}
                  value={profileInfo.email}
                  style={{ backgroundColor: argonTheme.COLORS.INPUT }}
                  editable={false}
                />
                <Input
                  placeholder="Phone Number"
                  value={profileInfo.phoneNumber}
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="phone"
                      family="AntDesign"
                    />
                  }
                  iconSize={14}
                  onChangeText={(value) => setProfile("phoneNumber", value)}
                />
                <Input
                  placeholder="Address"
                  value={profileInfo.address}
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="address"
                      family="Entypo"
                    />
                  }
                  iconSize={14}
                  onChangeText={(value) => setProfile("address", value)}
                />
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
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 0,
  },
});

export default ContactInfo;
