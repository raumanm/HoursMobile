
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, PanResponder} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTime } from './ProjectActions';
import TimeDisplay from './TimeDisplay';
import ProjectPickerTitle from './ProjectPickerTitle';

class TimeScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => { return {
    headerTitle: <ProjectPickerTitle routeDisplay={ 'Time' } nav={ navigation }/>,
    headerStyle: { backgroundColor: 'black' },
    headerLeft: null
  }};

  constructor(props) {
    super(props);

    this.state = { side: 0, totalTime: 0, lastPos: {}, moves: [] };
    this.buttonPressed = this.buttonPressed.bind(this);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        this.buttonPressed(evt.nativeEvent, gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.props.selectTime(this.state.totalTime);
        this.setState({lastPos: {}, moves: []});
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  calculateDirection = (newposX, newposY) => {
    const newState = {};

    if (Object.keys(this.state.lastPos) !== 0) {
      const b = { x: this.state.side/2, y: this.state.side/2 };
      const a = { x: this.state.lastPos.x, y: this.state.lastPos.y };
      const c = { x: newposX, y: newposY };
      const dir = (((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x)) > 0) ? -1 : 1;
      
      const arr = this.state.moves;
      arr.push(dir);
      const total = arr.reduce((sum, el) => sum + el );

      if (Math.abs(total) > 10) {
        newState.totalTime = this.state.totalTime + (5 * dir);
        if (newState.totalTime < 0 ) {
          newState.totalTime = 0;
        } else if (newState.totalTime > 1440) {
          newState.totalTime = 1440;
        }
        newState.total = [];
      }
    }

    newState.lastPos = { x: newposX, y: newposY }
    this.setState(newState);
  }

  buttonPressed = (evt, gestureState) => {
    this.calculateDirection(evt.locationX, evt.locationY);
  }

  donePressed = (evt) => {
    this.props.navigation.navigate('Add', {selected: this.props.navigation.getParam('selected', 'none'), time: this.state.totalTime });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.label}>TIME SPENT</Text>
          <TimeDisplay time={this.state.totalTime}/>
        </View>
        <View style={styles.middle_container}>
          <View 
            style={[styles.button, { borderRadius: this.state.side/2 }]}
            onLayout={({nativeEvent}) => this.setState({ side: nativeEvent.layout.width })}
            {...this._panResponder.panHandlers}
            >
            <TouchableOpacity onPress={(evt) => {this.donePressed(evt)}}>
              <View style={[styles.inner_button, { width: this.state.side/2, borderRadius: this.state.side/4, }]}>
                <Text style={{textAlign: 'center', color: 'white'}}>TOUCH TO ADD</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.bottom_container}>
            <TouchableOpacity onPress={() => {this.setState({totalTime: 450 })}}>
              <View style={styles.bottom_button}>
                <Text style={{textAlignVertical: 'center', textAlign: 'center', color: 'gray'}}>FULL DAY</Text>
              </View>
              </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    top_container: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    middle_container: {
        flex: 8,
        flexDirection: 'row',
        aspectRatio: 1
    },
    bottom_container: {
      marginTop: 2,
      borderTopWidth: 1,
      borderColor: 'lightgray',
      flex: 1,
      backgroundColor: 'white',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center'
    },
    label: {
        marginTop: 16,
        color: 'lightgray',
        fontSize: 9,
        textAlign: 'center'
    },
    button: {
      flex:1, 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1287B8',
      borderWidth: 6,
      borderColor: '#45B1E0'
    },
    inner_button: {
      aspectRatio: 1,
      backgroundColor: '#45B1E0', 
      alignContent: 'center', 
      justifyContent: 'center'
    },
    bottom_button: {
      flex: 1, 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  
  const mapStateToProps = (state) => {
    const { projects } = state 
    return { projects }
  };
  
  const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ selectTime }, dispatch))
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen);