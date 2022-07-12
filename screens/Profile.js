import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  DatePickerIOS,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { Button, Header, Icon, Input, Select, Switch } from "../components/";
import { format as formatDate } from "date-fns";

import { Button, Input, Select } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { axiosGet, axiosPatch } from "../util/restAPI";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      customer: {
        birthday: new Date(),
        gender: 0
      },
      editable: false,
      beingChanged: false,
      backgroundColor: "#d9d9d9",
    };
  }

  GenderSelect = React.createRef();

  async componentDidMount() {
    const { id: customerId } = JSON.parse(await AsyncStorage.getItem("user"));
    const customer = await axiosGet(`/customers/${customerId}`);
    // this.GenderSelect.current.select(2);
    const {avatar, ...shortCus} = customer.data
    console.log(666666, shortCus)
    this.setState({
      customerId,
      customer:
        { ...customer.data, birthday: new Date(customer.data.birthday) } || {},
    });
  }

  handleChangeCustomer(prop, value) {
    this.setState({
      customer: {
        ...this.state.customer,
        [prop]: value,
      },
      beingChanged: true,
    });
  }

  async saveCustomerInfo() {
    if (!this.state.beingChanged)
      return this.toggleAllowEditInfo(!this.state.editable);

    const { avatar, totalPoints, ...shortenCustomer } = this.state.customer;
    await axiosPatch(`/customers/${this.state.customerId}`, {
      ...shortenCustomer,
      birthday: formatDate(shortenCustomer.birthday, "yyyy-MM-dd"),
    });
    this.toggleAllowEditInfo(!this.state.editable);
  }

  toggleAllowEditInfo(shouldEditable) {
    this.setState({
      editable: shouldEditable,
      backgroundColor: shouldEditable ? "#ffffff" : "#d9d9d9",
      beingChanged: false,
    });
  }

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    {!this.state.editable ? (
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.INFO }}
                        onPress={() =>
                          this.toggleAllowEditInfo(!this.state.editable)
                        }
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.SUCCESS }}
                        onPress={() => this.saveCustomerInfo()}
                      >
                        Save
                      </Button>
                    )}
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      MESSAGE
                    </Button>
                  </Block>
                  <Block flex>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }} flex>
                      <Text>First Name</Text>
                      <Input
                        right
                        placeholder="First Name"
                        iconContent={<Block />}
                        value={this.state.customer.firstName}
                        style={{ backgroundColor: this.state.backgroundColor }}
                        editable={this.state.editable}
                        onChangeText={(value) =>
                          this.handleChangeCustomer("firstName", value)
                        }
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Last Name</Text>
                      <Input
                        right
                        placeholder="Last Name"
                        iconContent={<Block />}
                        value={this.state.customer.lastName}
                        style={{ backgroundColor: this.state.backgroundColor }}
                        editable={this.state.editable}
                        onChangeText={(value) =>
                          this.handleChangeCustomer("lastName", value)
                        }
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Email</Text>
                      <Input
                        right
                        placeholder="Email"
                        iconContent={<Block />}
                        value={this.state.customer.email}
                        style={{ backgroundColor: "#d9d9d9" }}
                        editable={false}
                        onChangeText={(value) =>
                          this.handleChangeCustomer("email", value)
                        }
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Phone Number</Text>
                      <Input
                        right
                        type={"numeric"}
                        placeholder="Phone Number"
                        iconContent={<Block />}
                        value={this.state.customer.phoneNumber}
                        style={{ backgroundColor: this.state.backgroundColor }}
                        editable={this.state.editable}
                        onChangeText={(value) =>
                          this.handleChangeCustomer("phoneNumber", value)
                        }
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Gender</Text>
                      <Select
                        ref={this.GenderSelect}
                        disabled={!this.state.editable}
                        dropdownStyle={{ height: 105 }}
                        style={{ backgroundColor: this.state.backgroundColor }}
                        defaultIndex={this.state.customer.gender}
                        renderButtonText={({ title }) => title}
                        onSelect={(gender) =>
                          this.handleChangeCustomer("gender", gender)
                        }
                        options={[
                          { key: 0, value: "Male" },
                          { key: 1, value: "Female" },
                          { key: 2, value: "Other" },
                        ]}
                        editable={this.state.editable}
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Birthday</Text>
                      {/* <Input
                        right
                        type="date"
                        placeholder="Birthday"
                        iconContent={<Block />}
                        value={this.state.customer.birthday}
                        // onChangeText={(value) =>
                        //   this.handleChangeCustomer("birthday", value)
                        // }
                      /> */}
                      {/* <DatePickerIOS date={new Date()} /> */}
                      <DateTimePicker
                        type="date"
                        value={this.state.customer.birthday}
                        editable={this.state.editable}
                        onChange={(event, date) =>
                          this.handleChangeCustomer("birthday", date)
                        }
                      />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text>Address</Text>
                      <Input
                        right
                        placeholder="Address"
                        iconContent={<Block />}
                        value={this.state.customer.address}
                        style={{ backgroundColor: this.state.backgroundColor }}
                        editable={this.state.editable}
                        onChangeText={(value) =>
                          this.handleChangeCustomer("address", value)
                        }
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
  }
}

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
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
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
});

export default Profile;
