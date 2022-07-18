//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ImageBackground,
  StatusBar,
  View,
} from "react-native";
import Images from "../constants/Images";
import { argonTheme } from "../constants";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { axiosGet } from "../util/restAPI";

const { width, height } = Dimensions.get("screen");

class Qrcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrContent: "<svg></svg>",
      barcodeContent: "",
      totalPoints: 0
    };
  }

  async componentDidMount() {
    const stringUserInfo = await AsyncStorage.getItem("user");
    const { id, cardId, ...rest } = JSON.parse(stringUserInfo);
    const {totalPoints} = (await axiosGet(`/customers/${id}`)).data;
    const {avatar, ...shortCus} = customer.data

    this.setState({ qrContent: JSON.stringify({ cardId }), barcodeContent: cardId, totalPoints });
  }

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.BackGround}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex center>
            <Block style={styles.qrcontainer}>
              <Block flex>
                <Block flex={0.17} middle style={{ marginTop: 10 }}>
                  <Text size={12}>Give this QR Code to our Staffs</Text>
                </Block>
                <Block middle>
                  <Barcode value={this.state.barcodeContent || " "} format="CODE128A" />
                </Block>
                <Block middle style={{ marginTop: 60 }}>
                  <QRCode
                    value={this.state.qrContent || ""}
                    logo={Images.VtownLogo}
                    logoSize={50}
                    size={200}
                    logoBorderRadius={30}
                  />
                </Block>
              </Block>
            </Block>
            <View style={{ height: 2 }} />
            <Block style={styles.bottomcontainer}>
              <Block flex middle>
                <Block flex={0.3} middle>
                  <Text size={12}>
                    Your current Points:
                  </Text>
                </Block>
                <Block middle>
                  <Text size={30} style={styles.totalPoint}>
                    {this.state.totalPoints}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  qrcontainer: {
    marginTop: 50,
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#ffffff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  bottomcontainer: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: "#ffffff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  totalPoint: {
    color: "#e84168"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: theme.SIZES.BASE,
  },
  text: {
    paddingHorizontal: theme.SIZES.BASE,
  },
});

export default Qrcode;
