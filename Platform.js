import React, {Component} from 'react';
import { Platform, DatePickerAndroid, DatePickerIOS } from 'react-native';

export const icons = Platform.select({
    ios: {
        calendar: "ios-calendar",
        timer: "ios-timer",
        list: "ios-list",
        more: "ios-more",
    },
    android: {
        calendar: "md-calendar",
        timer: "md-timer",
        list: "md-list",
        more: "md-more"
    },
});

const selectDateAndroid = async () => {
    try {
      const obj = await DatePickerAndroid.open({
        date: new Date()
      });
      if (obj.action !== DatePickerAndroid.dismissedAction) {
        this.props.selectDate({year: obj.year, month: obj.month, date: obj.day });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
}

export const getDate = (cb) => {

}