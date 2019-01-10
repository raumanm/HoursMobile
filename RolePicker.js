import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Picker} from 'react-native';

type Props = {};
export default class RolePicker extends Component<Props> {
  constructor(props) {
    super(props);
  } 

  convertToItems(element) {
    return (
      <Picker.Item key={element.key} label={element.label} value={element.value}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker 
          mode="dropdown"
          selectedValue={ this.props.selected } 
          onValueChange={ (value) => this.props.select(value) }
          style={ [styles.picker,  { minWidth: 200 } ]}
          >
          { this.props.data.map(el => this.convertToItems(el) ) }
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      maxHeight: Platform.OS === 'ios' ? 180 : 40,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8
    },
    picker: {
      minHeight: Platform.OS === 'ios' ? 180 : 40,
    }
  });
  