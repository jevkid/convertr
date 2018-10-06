import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Font } from 'expo';

import { AsyncStorage } from 'react-native';

import Dropdown from '../../consts/Dropdown';

import { getItem, setItem, clearCache } from '../../utils/storageUtils';

// Icons
import { FontAwesome } from '@expo/vector-icons';

import { commonStyles } from '../../consts/commonStyles';

import countries from '../../consts/countries.json';

const { height, width } = Dimensions.get('window');

const light = '';
const dark = 'rgb(55, 58, 91)';
const baseUrl = 'https://free.currencyconverterapi.com/api/v6';

export default class Currency extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount(){
    this.setCurrencies(countries);
    await Font.loadAsync({
      'AssistantLight': require('../../assets/fonts/Assistant-Light.ttf'),
      'AssistantRegular': require('../../assets/fonts/Assistant-Regular.ttf'),
      'AssistantBold': require('../../assets/fonts/Assistant-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  setCurrencies(countries){
    getItem('previousConversion').then((data) => {
      if (data !== null) {
        this.setState({ previousConversion: data });
      }
    });

    getItem('currencies').then((data) => {
      if (data !== null) {
        this.setState({ currencies: data });
      } else {
        this.getCurrencies();
      }
    });

    if(!countries || countries.length < 1){
      getItem('countries').then((data) => {
        if (data !== null) {
          // console.log(JSON.parse(data));
          this.setState({ countries: data });
        } else {
          console.log('hi');
          this.getCountries();
        }
      });   
    } else {
      this.setState({ countries });
    }
  }

  getCurrencies(){
    fetch(`${baseUrl}/currencies`, {
      headers: {
        'Accept': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {
      setItem('currencies', data.results);
      this.setState({ currencies: data.results });
    });
  }

  getCountries(){
    fetch(`${baseUrl}/countries`, {
      headers: {
        'Accept': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {
      let countries = [];
      Object.keys(data.results).map((country) => {
        countries.push(data.results[country]);
      });
      if(countries.length > 0){
        setItem('countries', countries);
        this.setState({ countries: countries });
      }
    });
  }

  getRates(curr1, curr2){
    fetch(`${baseUrl}/convert?q=${curr1}_${curr2}`, {
      headers: {
        'Accept': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    });
  }

  getFlag(countryCode, size, style){
    // example: https://www.countryflags.io/be/flat/64.png
    return `https://www.countryflags.io/${countryCode}/${style}/${size}.png`
  }

  clearStorage(){
    clearCache();
  }

  selectCurrency(item){
    console.log(item);
  }

  render() {
    // console.log(this.state.countries);
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, display: 'flex', justifyContent: 'flex-start', backgroundColor: dark}}>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: dark}}>
          {this.state.loading &&
            <Text style={{fontFamily: 'AssistantLight', fontSize: 48, color: '#FFFFFF'}}>Loading...</Text>
            ||
            <View style={{display: 'flex', flexDirection: 'column', width: width, justifyContent: 'center', alignContent: 'center'}}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
                <Text onPress={() => this.clearStorage()} style={[commonStyles.textLight, commonStyles.textWhite, {fontSize: 18}]}>clear</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
                <Text style={[commonStyles.textLight, commonStyles.textWhite, {fontSize: 36}]}>Convert currency</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  marginHorizontal: 50}}>
                <View style={{display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <Image source={{uri: 'https://www.countryflags.io/us/flat/64.png'}} style={{height: 64, width: 64}}/>
                  <TextInput style={{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, height: 42, width: 100}} />
                  {this.state.countries && this.state.countries.length > 0 &&
                    <Dropdown
                      data={this.state.countries}
                      handleSelect={this.selectCurrency.bind(this)}
                      value='currencyName'
                    />
                  }
                </View>
                <View style={{display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <Image source={{uri: 'https://www.countryflags.io/gb/flat/64.png'}} style={{height: 64, width: 64}}/>
                  <TextInput style={{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, height: 42, width: 100}} />
                  {this.state.countries && this.state.countries.length > 0 &&
                    <Dropdown
                      data={this.state.countries}
                      handleSelect={this.selectCurrency.bind(this)}
                      value='currencyName'
                    /> 
                  }
                </View>
              </View>
              {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  marginHorizontal: 50}}>
                <View style={{display: 'flex', alignContent: 'flex-start', alignItems: 'flex-start'}}>
                  <Text style={[commonStyles.textLight, commonStyles.textWhite, {fontSize: 18}]}>currency 1</Text>
                </View>
                <View style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                  <Text style={[commonStyles.textLight, commonStyles.textWhite, {fontSize: 18}]}>-></Text>
                </View>
                <View style={{display: 'flex', alignContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Text style={[commonStyles.textLight, commonStyles.textWhite, {fontSize: 18}]}>currency 2</Text>
                </View>
              </View> */}
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  headerText: {
    fontFamily: 'FranklinDemi', 
    color: '#ffffff',    
    fontWeight: '400',    
    fontSize: 32,
    alignSelf: 'flex-start'
  }
});