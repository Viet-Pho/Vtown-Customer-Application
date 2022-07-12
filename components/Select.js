import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ModalDropdown from "react-native-modal-dropdown";
import { Block, Text } from "galio-framework";

import Icon from "./Icon";
import { argonTheme } from "../constants";

class DropDown extends React.Component {
  state = {
    key: 1,
    value: "",
  };

  handleOnSelect = (index, { key, value }) => {
    const { onSelect } = this.props;

    this.setState({ value, key });
    onSelect && onSelect(index, value, key);
  };

  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      dropdownStyle,
      disabled,
      options,
      defaultIndex,
      ...props
    } = this.props;

    const modalStyles = [
      styles.qty,
      color && { backgroundColor: color },
      style,
    ];

    const textStyles = [styles.text, textStyle];

    const dropdownStyles = [styles.dropdown, dropdownStyle];

    return (
      <ModalDropdown
        disabled={disabled}
        style={modalStyles}
        renderRow={(option) => (
          <Text style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
            {option.value}
          </Text>
        )}
        onSelect={this.handleOnSelect}
        dropdownStyle={dropdownStyles}
        options={options}
        dropdownTextStyle={{ paddingLeft: 16, fontSize: 12 }}
        {...props}
      >
        <Block flex row middle space="between">
          <Text size={12} style={textStyles}>
            {this.state.value || options[defaultIndex].value}
          </Text>
          <Icon
            name={iconName || "nav-down"}
            family={iconFamily || "ArgonExtra"}
            size={iconSize || 10}
            color={iconColor || argonTheme.COLORS.HEADER}
          />
        </Block>
      </ModalDropdown>
    );
  }
}

DropDown.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  qty: {
    width: 100,
    backgroundColor: argonTheme.COLORS.DEFAULT,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  text: {
    color: argonTheme.COLORS.HEADER,
    fontWeight: "600",
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 100,
  },
});

export default DropDown;
