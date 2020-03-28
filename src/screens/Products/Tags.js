import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        tags_name: '',
        dataSource: [],
        tag_id: '',
      }
  }

  componentDidMount(){
    this.getAllTags()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
              placeholder = "Enter tag name here..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {(text) => this.tags_name = text}/>
        <Button
            title="Save tag"
            onPress={() => this.saveTag()}
          />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={this.renderItem}
          // keyExtractor={(item, index) => index}
          keyExtractor={item => item.product_category_id.toString()}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item.product_category_id)}>
      <View>
        <Text>{item.product_type_name}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  _onPress(tag_id){
    Alert.alert(tag_id);
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B"
        }}
      />
    );
  }

  saveTag(){
    if(!this.tags_name){
      Alert.alert('Please enter name');
    } else {
      const formData = new FormData();
      formData.append('product_type_name', this.tags_name);
      fetch(global.global_url+'save_tags.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: formData

      }).then((response) => response.json())
        .then((responseJson) => {

          const first = responseJson.save_response[0]
          console.log(first)
          if(first.status == 'success'){
            Alert.alert('Success !');
            this.getAllTags()
          } else if(first.status == 'failed'){
            Alert.alert('failed !');
          } else {
            Alert.alert('Duplicate name !');
          }

        }).catch((error) => {
          console.error(error);
        });
      }
    }

    getAllTags(){
      fetch(global.global_url+'get_all_tags.php')
      .then((response) => response.json())
            .then((responseJson) => {
              var data = responseJson.array_tags.map(function(item) {
                return {
                  product_category_id: item.product_category_id,
                  product_type_name: item.product_type_name
                };
              });
              console.log(data)
              this.setState({
                dataSource: data
              })
  
            }).catch((error) => {
              console.error(error);
            });
      }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});