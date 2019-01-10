
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

type Props = {};
export default class LoginScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.outer_container}>
        <View style={styles.inner_container}>
          <View style={styles.logo_container}>
            <Image style={styles.logo} source={require('./img/HOURS_logo_small.png')} resizeMode="contain"/>
          </View>
          <View style={styles.control_container}>
            <Text style={styles.sign_in}>Sign in</Text>
            <View style={styles.text_input_container}>
              <TextInput
                placeholder={"Username"}
                style={styles.text_input}
                multiline={false}
              />
            </View>
            <View style={styles.text_input_container}>
              <TextInput
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.text_input}
                multiline={false}
              />
            </View>
            <View style={styles.button_container}>
              <Button
                style={styles.login_button}
                title={"Login"}
                onPress={()=>{ this.props.navigation.navigate('Hours')}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    outer_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1E8DBB',
    },
    inner_container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 48,
      marginHorizontal: 16,
      borderWidth: 0,
      borderRadius: 6,
      backgroundColor: 'white'
    },
    logo_container: {
      flex:1,
      flexDirection: 'row',
      marginVertical: 16,
      marginHorizontal: 48,
    },
    logo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: undefined,
      width: undefined
    },
    control_container: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    sign_in: {
      fontSize: 11,
      fontWeight: "100",
      textAlign: 'center',
      marginVertical: 12
    },
    text_input_container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      maxHeight: 40,
      minHeight: 38,
      minWidth: 220,
      marginVertical: 4,
    },
    text_input: {
      flex: 1,
      marginBottom: 4,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8
    },
    button_container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',

      marginTop: 32,
      borderColor: 'pink',
    },
    login_button: {
    }
  });
  