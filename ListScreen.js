import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as platform from './Platform';
import * as Utils from './Util';
import { StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid, FlatList } from 'react-native';
import ProjectPickerTitle from './ProjectPickerTitle';
import { removeHours } from './ProjectActions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ListScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => { return {
    headerTitle: <ProjectPickerTitle routeDisplay={ 'History' } nav={ navigation }/>,
    headerStyle: { backgroundColor: 'black'}
  }};

  constructor(props) {
    super(props);

    let start = new Date()
      , stop = new Date();

    start.setDate(stop.getDate() - 7);

    const data = 
    
    this.state = { 
      filterby: this.props.projects.selected.value, 
      startDate: start, 
      stopDate: stop, 
      listdata: ListScreen.updatelist(this.props.projects.hours, this.props.projects.selected.value, start, stop),
      hours: this.props.projects.hours,
      selectedRows: [],
      isDateTimePickerVisible: false,
      updating: "",  
    }
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  selectStart = () => {
    this.setState({updating: 'start', isDateTimePickerVisible: true})
  }

  selectStop = () => {
    this.setState({updating: 'stop', isDateTimePickerVisible: true})
  }

  _callbk = (date) => {
    console.log("gotDate", this.state.updating, date);
    if (this.state.updating === 'start') {
      this.setState({
        startDate: date, 
        isDateTimePickerVisible: false,
        listdata: ListScreen.updatelist(this.state.hours, this.state.filterby, date, this.state.stopDate),
        selectedRows: []
      });
    } else if (this.state.updating === 'stop') {
      this.setState({
        stopDate: date, 
        isDateTimePickerVisible: false,
        listdata: ListScreen.updatelist(this.state.hours, this.state.filterby, this.state.startDate, date),
        selectedRows: [],
      });
    }
  }

  selectedRow = (idx) => {
    let arr = this.state.selectedRows;
    if (arr.indexOf(idx) > -1) {
      this.setState({selectedRows: arr.filter(val => val !== idx) });
    } else {
      arr.push(idx);
      this.setState({ selectedRows: arr });
    }
  }

  static updatelist = (arr, filterby, start, stop) => {
    return arr.filter((el) => {
      return (el.project === filterby
        && el.date.getTime() >= start.getTime()
        && el.date.getTime() <= stop.getTime())
    })
    .map(el => ({ 
      key: el.key, 
      date: Utils.dateToString(el.date), 
      hours: (el.time/60).toFixed(2), 
      category: el.role, 
      comment: el.comment === undefined ? "" : el.comment
      }))
  }

  static getDerivedStateFromProps(props, state) {
    if (props.projects.selected.value !== state.filterby) {
      return ({ 
        filterby: props.projects.selected.value,
        listdata: ListScreen.updatelist(props.projects.hours, props.projects.selected.value, state.startDate, state.stopDate),
        selectedRows: []
      });
    }
    if (state.hours.length !== props.projects.hours.length)
    {
      return ({ 
        listdata: ListScreen.updatelist(props.projects.hours, props.projects.selected.value, state.startDate, state.stopDate),
        selectedRows: []
      });
    }
    return null;
  }

  renderItem = ({ item, index }) => {
    if (this.state.selectedRows.includes(index)) {
      return (
        <View style={ styles.row_container_selected }>
          <View style={ styles.row_basic_container }>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.date}</Text></View>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.hours}</Text></View>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.category}</Text></View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.selectedRow(index) }>
                <View><Ionicons name={platform.icons.more} style={{}}/></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.row_details_container }>
            <View style={ styles.row_basic_container }>
            <Text style={ [styles.low_row_text, {flex: 1}]}>Comment</Text>
            <TouchableOpacity onPress= {() => this.props.removeHours(item.key)}>
              <View>
                <Text style={[styles.low_row_text, { flex: 1, textAlign: 'right', color: 'red' }]}>Remove</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={ styles.row_basic_container }>
            <Text style={styles.low_row_text}>{ item.comment }</Text>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={ styles.row_container }>
          <View style={ styles.row_basic_container }>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.date}</Text></View>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.hours}</Text></View>
            <View style={{ flex: 3 }}><Text style={styles.row_text}>{item.category}</Text></View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.selectedRow(index) }>
                <View><Ionicons name={platform.icons.more}/></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.label}>HISTORY</Text>
          <View style={styles.history_label_container}>
            <Text style={styles.history_label_value}>Hours between</Text>
            <Text style={styles.history_label_value}>{ Utils.dateToString(this.state.startDate) }</Text>
            <Text style={styles.history_label_value}>and</Text>
            <Text style={styles.history_label_value}>{ Utils.dateToString(this.state.stopDate) }</Text>
          </View>
          <View style={styles.range_select_container}>
          <TouchableOpacity onPress={ this.selectStart }>
            <View style={styles.range_select}>
              <Ionicons name={platform.icons.calendar} style={{ marginLeft: 4 }}/>
              <Text style={styles.range_text}>{  Utils.dateToString(this.state.startDate) }</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 8, fontSize: 32 }}>-</Text>
          <TouchableOpacity onPress={ this.selectStop }>
            <View style={styles.range_select}>
              <Ionicons name={platform.icons.calendar} style={{ marginLeft: 4 }}/>
              <Text style={styles.range_text}>{  Utils.dateToString( this.state.stopDate) }</Text>
            </View>
          </TouchableOpacity>
          <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._callbk}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={ styles.list_labels }>
            <View style={{ flex: 3 }}><Text style={[styles.list_label_text]}>Date</Text></View>
            <View style={{ flex: 3 }}><Text style={[styles.list_label_text]}>Hours</Text></View>
            <View style={{ flex: 3 }}><Text style={[styles.list_label_text]}>Category</Text></View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        <View style={ styles.bottom_container }>
          <FlatList 
            data={ this.state.listdata } 
            extraData={this.state} 
            renderItem={(item) => this.renderItem(item) }/>
        </View>
      </View> 
    );
  }
}


const styles = StyleSheet.create({
  row_container: {
    flex: 1,
    minHeight: 20,
  },
  row_container_selected: {
    flex: 1,
    minHeight: 60,
  },
  row_basic_container: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  row_text: {
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  low_row_text: {
    fontSize: 10,  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },
  top_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom_container: {
    flex: 2,
  },
  label: {
    marginTop: 16,
    color: 'lightgray',
    fontSize: 9,
    textAlign: 'center'
  },
  history_label_container: {
    marginTop: 12, 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  range_select_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  range_select: {
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  range_text: {
    marginHorizontal: 4,
    textAlignVertical: 'top',
    textAlign: 'right',
  },
  list_labels: {
    marginTop: 16,
    marginHorizontal: 16,
    borderColor: 'black',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  list_label_text: {
    textAlignVertical: 'bottom',
  },
  history_label_value: {
    marginEnd: 2
  },
  row_details_container: {
    marginHorizontal: 16,
    paddingHorizontal: 12
  }
  });

const mapStateToProps = (state) => {
  const { projects } = state 
  return { projects }
};

const mapDispatchToProps = dispatch => {
  return (bindActionCreators({ removeHours }, dispatch))
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
