
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import { selectRole, selectDate, selectComment, addHours } from './ProjectActions';
import * as Utils from './Util';
import * as PlatformUtils from './Platform';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeDisplay from './TimeDisplay';
import ProjectPickerTitle from './ProjectPickerTitle';
import RolePicker from './RolePicker';

class AddScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => { return {
    headerTitle: <ProjectPickerTitle routeDisplay={ 'Add' } nav={ navigation }/>,
    headerStyle: { backgroundColor: 'black' },
    headerLeft: null
  }};

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (picked) => {
    this.setState({ isDateTimePickerVisible: false })
    this.props.selectDate(picked);
  };

  constructor(props) {
    super(props);
    this.state = {totalTime: props.navigation.getParam('time', 0), isDateTimePickerVisible: false };
    this.props.selectRole(this.props.projects.selected.roles[0].value);
  }

  _add_hours = () => {
    this.props.selectComment(this.state.entered);
    
    if( !(this.props.projects.creating.date == null) ) {
      this.props.addHours({...this.props.projects.creating, project: this.props.projects.selected.value });
      this.props.navigation.navigate('List');
    }
  }

  render() {
    let rolesData = this.props.projects.selected.roles;

    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
        <View style={styles.top_container}>
          <Text style={styles.label}>TIME SPENT</Text>
          <TimeDisplay time={this.state.totalTime}/>
        </View>
        <View style={styles.middle_container}>
          <Text style={styles.label}>DATE</Text>
          <View style={styles.control_wrapper}>
            <Button
              title={ this.props.projects.creating.date == null 
                ? 'Pick Date' 
                : Utils.dateToString(this.props.projects.creating.date) }
              onPress={ this._showDateTimePicker }/>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={[styles.control_wrapper, { flex: 1, paddingTop: 8, alignContent: 'center' }]}>
            <RolePicker data={ rolesData ? rolesData : undefined } 
              select={ (val) => this.props.selectRole(val) } 
              selected={ this.props.projects.creating.role == null ? rolesData[0].value :  this.props.projects.creating.role }/>
          </View>
          <View style={[styles.control_wrapper, { flex: 3 }]}>
          <Text style={styles.label}>COMMENT</Text>
            <TextInput
                  placeholder={"Comment"}
                  style={styles.text_input}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={text => this.setState({entered: text})}
            />
          </View>
          </View>
        <View style={styles.bottom_container}>
          <Button style={[styles.bottom_controls]} title={"CANCEL"} onPress={() => console.log('cancel')}/>
          <Button style={[styles.bottom_controls]} title={"OK"} onPress={this._add_hours}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  control_wrapper: {
    alignSelf: 'stretch'
  },
  top_container: {
      flex: 1,
      justifyContent: 'flex-start',
  },
  values_container: {
      flexDirection: 'row',
      maxHeight: 40
  },
  middle_container: {
      flex: 8,
      alignSelf: 'stretch',
      marginHorizontal: 32,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
  },
  bottom_container: {
    marginVertical: 2,
    borderTopWidth: 1,
    borderColor: 'lightgray',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  },
  label: {
    marginTop: 8,
    color: 'gray',
    fontSize: 9,
    textAlign: 'center'
  },
  text_input: {
    flex: 1,
    alignSelf: 'stretch',
    textAlignVertical: "top",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8
  },
  bottom_controls: {
    marginRight: 16,
    marginVertical: 8,
  }
});
  
const mapStateToProps = (state) => {
  const { projects } = state 
  return { projects }
};

const mapDispatchToProps = dispatch => {
  return (bindActionCreators({ selectRole, selectDate, selectComment, addHours }, dispatch))
};

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);