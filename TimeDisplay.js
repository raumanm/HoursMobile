import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class TimeDisplay extends Component<Props> {
  render() {
    return (
      <View style={styles.values_container}>
        <Text style={styles.values_text}>{ Math.floor(this.props.time / 60) }</Text>
        <Text style={styles.values_label}>h</Text>
        <Text style={styles.values_text}>{ this.props.time % 60 }</Text>
        <Text style={styles.values_label}>min</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  values_container: {
    flexDirection: 'row',
    maxHeight: 40
  },
  values_text: {
    marginLeft: 16,
    marginRight: 2,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1287B8',
  },
  values_label: {
      textAlignVertical: 'bottom'
  },
});
  