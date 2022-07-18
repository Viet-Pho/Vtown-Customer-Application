import React from "react";
// import { withNavigation } from '@react-navigation/compat';
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";

class InputCard extends React.Component {
  render() {
    const { title, children, style, onPressAction } = this.props;
    const cartStyles = [styles.card, style];

    return (
      <Block flex style={cartStyles}>
        {title && (
          <Block row space="between" style={styles.header}>
            <Text style={styles.title} color={argonTheme.COLORS.DEFAULT}>
              {title}
            </Text>
            <Text
              size={12}
              color={argonTheme.COLORS.ACTIVE}
              onPress={onPressAction}
            >
              Edit
            </Text>
          </Block>
        )}
        <Block style={styles.content}>{children}</Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    marginBottom: 10,
    padding: 10,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Arial",
  },
  action: {
    color: theme.COLORS.FACEBOOK,
  },
});

export default InputCard;
