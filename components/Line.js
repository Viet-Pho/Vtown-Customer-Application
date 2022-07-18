import React from "react";
// import { withNavigation } from '@react-navigation/compat';
// import PropTypes from 'prop-types';
import { StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";
import Icon from "./Icon";
import { argonTheme } from "../constants";

class Line extends React.Component {
  render() {
    const { title, style, value, iconName, iconFamily, iconColor, onPress } =
      this.props;

    return (
      <Block left row style={style}>
        <Block center flex={0.1} onPress={onPress}>
          <Icon
            size={25}
            name={iconName}
            family={iconFamily}
            color={iconColor || argonTheme.COLORS.DEFAULT}
          />
        </Block>
        <Block center row left flex={0.75} onPress={onPress}>
          {title && (
            <Text
              style={styles.title}
              onPress={onPress}
              color={argonTheme.COLORS.DEFAULT}
            >
              {title}
            </Text>
          )}
          <Text
            style={styles.value}
            onPress={onPress}
            color={argonTheme.COLORS.DEFAULT}
          >
            {value}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 5,
  },
  value: {
    fontWeight: "700",
    marginLeft: 5,
  },
});

export default Line;
