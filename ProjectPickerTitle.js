import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { selectProject } from './ProjectActions';
import { bindActionCreators } from 'redux';

class ProjectPickerTitle extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = { items: this.props.projects.possible.map(el => this.convertToItems(el)) }
  } 

  convertToItems(element) {
    return (
      <Picker.Item key={element.key} label={element.label} value={element.value}/>
    );
  }

  launchActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: this.props.projects.possible.map(el => el.label )
    },
    (buttonIndex) => { 
      this.props.selectProject(this.props.projects.possible[buttonIndex].value);
      console.log(this.props.projects.selected);
    })
  }

  androidVersion = () => {
    return (
      <View style={styles.outer_container}>
        <View style={[styles.inner_container, {maxHeight: 10}]}>
          <Text style={styles.label}>SELECT PROJECT</Text>
        </View>
        <View style={[styles.inner_container, {}]}>
          <Picker 
            mode="dialog"
            selectedValue={ this.props.projects.selected ? this.props.projects.selected.value : this.state.items[0].value } 
            onValueChange={(project) => { console.log(project); this.props.selectProject(project); }}
            style={[styles.picker,  { minWidth: 220, maxWidth: 320}]}
            >
            { this.state.items }
          </Picker>
        </View>
      </View>
    );
  }

  iosVersion = () => {
    return (
      <View style={styles.outer_container}>
      <View style={[styles.inner_container, {maxHeight: 10}]}>
        <Text style={styles.label}>SELECT PROJECT</Text>
      </View>
      <View style={[styles.inner_container, {}]}>
        <TouchableOpacity onPress={()=> this.launchActionSheet()}>
          <View>
            <Text style={{ color: 'white' }}>{ this.props.projects.selected ? this.props.projects.selected.label : this.state.items[0].label }</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    )
  }

  render() {
    if(Platform.OS === 'android') {
      return this.androidVersion();
    } else if (Platform.OS === 'ios') {
      return this.iosVersion();
    }
  }
}

const styles = StyleSheet.create({
  outer_container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inner_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  picker: {
    minHeight: 30,
    color: 'white'
  },
  label: {
    color: 'white',
    fontSize: 9,
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => {
  const { projects } = state 
  return { projects }
};

const mapDispatchToProps = dispatch => {
  return (bindActionCreators({ selectProject }, dispatch))
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPickerTitle);