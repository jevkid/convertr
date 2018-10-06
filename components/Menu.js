<script src="http://localhost:8097"></script>
import React from 'react';
import { ScrollView, View, Text, Image, ImageBackground, Linking, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Dimensions, Platform} from 'react-native';

import { Font, LinearGradient } from 'expo';
import { commonStyles } from '../consts/commonStyles';
const { height, width } = Dimensions.get('window');
const light = '';
const dark = 'rgba(26, 27, 42, 1)';

export default class Menu extends React.Component {
  static navigationOptions = {
    headerStyle: { 
      backgroundColor: dark, 
      shadowColor: 'transparent', 
      elevation: 0, 
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTintColor: '#ffffff',
    shadowColor: 'transparent'
  };
    constructor() {
      super();
      this.state = {
        fontLoaded: false
      }
    }

    async componentDidMount(){
      await Font.loadAsync({
        'AssistantLight': require('../assets/fonts/Assistant-Light.ttf'),
        'AssistantRegular': require('../assets/fonts/Assistant-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    }
    
    render() {
      const resizeMode = 'contain';
      const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;    
      return (
        <ScrollView
          style={{display: 'flex', flex: 1, flexDirection: 'column', flexGrow: 1, backgroundColor: 'rgba(26, 27, 42, 1)'}}
          contentContainerStyle={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
        >
          {this.state.fontLoaded &&
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: 'AssistantLight', fontSize: 48, color: '#FFFFFF'}}>convertr</Text>
              <Text
                onPress={() => { this.props.navigation.navigate('Currency'); }}
                style={{fontFamily: 'AssistantLight', fontSize: 18, color: '#FFFFFF', textDecorationLine: 'underline'}}
              >
                Currency
              </Text>
            </View>
          }
        </ScrollView>
      );
    }
  }
  