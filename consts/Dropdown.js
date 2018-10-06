import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Font } from 'expo';

import { commonStyles } from './commonStyles';

export default class Dropdown extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#1D1D1D",
          marginLeft: "14%"
        }}
      />
    );
  };

  render(){
    return (
      <FlatList
        style={[this.props.styleOverrides, {height: 42}]}
        data={this.props.data}  
        ItemSeparatorComponent={this.renderSeparator}                    
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.props.handleSelect(item)}
            key={item.id}
          >
            <View key={item.id} style={{backgroundColor: 'white'}}>
              <Text style={[commonStyles.textReg, commonStyles.textDark], {fontSize: 14}}>{item[this.props.value]}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}