//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  StyleSheet,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { SvgXml } from "react-native-svg";

// import { Card } from "../components/";
import React from "react";
import QRCode from "qrcode";

const { width, height } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;

class Qrcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrContent: "<svg></svg>",
    };
  }

  async componentDidMount() {
    const stringUserInfo = await AsyncStorage.getItem("user");
    const { id, cardId, ...rest } = JSON.parse(stringUserInfo);
    const qrContent = await QRCode.toString(JSON.stringify({ cardId }));
    this.setState({ qrContent });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Block center style={styles.text}>
          <Text>Give your Qr code to our Staff</Text>
        </Block>
        <Block height={height / 2}>
          <SvgXml xml={this.state.qrContent || ""} />
        </Block>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
