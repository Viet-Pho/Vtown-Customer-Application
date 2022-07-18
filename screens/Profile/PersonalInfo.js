import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, theme } from "galio-framework";
import { format as formatDate } from "date-fns";
import { Input, Select, Icon } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { useProfile, useProfileActions } from "../../providers/ProfileProvider";

const { width, height } = Dimensions.get("screen");

const genderOptions = [
  { key: 0, value: "Male" },
  { key: 1, value: "Female" },
  { key: 2, value: "Other" },
];

const PersonalInfo = ({ route: { params } }) => {
  const GenderSelect = React.createRef();
  const { profileInfo } = useProfile();
  const { customerId, profile } = params;
  const { setProfile, initProfile } = useProfileActions();

  useEffect(() => {
    initProfile(customerId, profile);
  }, [customerId]);

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
                  placeholder="First Name"
                  value={profileInfo.firstName}
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="person"
                      family="MaterialIcons"
                    />
                  }
                  iconSize={14}
                  onChangeText={(value) => setProfile("firstName", value)}
                />
                <Input
                  placeholder="Last Name"
                  value={profileInfo.lastName}
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="person"
                      family="MaterialIcons"
                    />
                  }
                  iconSize={14}
                  onChangeText={(value) => setProfile("lastName", value)}
                />
                <Input
                  placeholder="Birthday"
                  iconContent={
                    <Icon
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      style={{ marginRight: 10 }}
                      name="cake"
                      family="MaterialIcons"
                    />
                  }
                  style={{ backgroundColor: argonTheme.COLORS.INPUT }}
                  editable={false}
                  value={formatDate(
                    new Date(profileInfo.birthday),
                    "dd/MM/yyyy"
                  )}
                  iconSize={14}
                />
                <Block row flex center>
                  <Block flex={0.1} style={{ marginLeft: 15 }}>
                    <Icon
                      flex={0.1}
                      size={14}
                      color={argonTheme.COLORS.ICON}
                      name="male-female"
                      family="Foundation"
                    />
                  </Block>
                  <Block flex={0.9}>
                    <Select
                      ref={GenderSelect}
                      dropdownStyle={{ height: 105 }}
                      defaultIndex={profileInfo.gender}
                      style={{ backgroundColor: argonTheme.COLORS.WHITE }}
                      onSelect={(gender) => setProfile("gender", gender)}
                      options={genderOptions}
                    />
                  </Block>
                </Block>
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
    zIndex: 99,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 99,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 99,
  },
  info: {
    paddingHorizontal: 0,
  },
});

export default PersonalInfo;
