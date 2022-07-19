import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  View,
  Text,
} from "react-native";
import { format as formatDate } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatepicker = (props) => {
  const { textStyle, onDateChage, defaultDate } = props;
  const [date, setDate] = useState(new Date(defaultDate));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const onAndroidChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      onDateChage(selectedDate);
    }
  };

  const onCancelPress = () => {
    setDate(new Date(defaultDate));
    setShow(false);
  };

  const onDonePress = () => {
    onDateChage(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        onChange={Platform.OS === "ios" ? onChange : onAndroidChange}
      />
    );
  };

  return (
    <TouchableHighlight activeOpacity={0} onPress={() => setShow(true)}>
      <View>
        <Text style={textStyle}>{formatDate(date, "dd/MM/yyyy")}</Text>
        {Platform.OS !== "ios" && show && renderDatePicker()}
        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={"#ffffff"}
                  style={{
                    flex: 1,
                    borderTopColor: "#e9e9e9",
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log("datepciker clicked")}
                >
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      height: 256,
                      overflow: "hidden",
                    }}
                  >
                    <View style={{ marginTop: 20 }}>
                      <DateTimePicker
                        timeZoneOffsetInMinutes={0}
                        value={new Date(date)}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                      />
                    </View>
                    <TouchableHighlight
                      underlayColor={"transparent"}
                      onPress={onCancelPress}
                      style={[styles.btnText, styles.btnCancel]}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={"transparent"}
                      onPress={onDonePress}
                      style={[styles.btnText, styles.btnDone]}
                    >
                      <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnText: {
    position: "absolute",
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});

export default CustomDatepicker;
