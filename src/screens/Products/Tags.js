import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        tags_name: '',
        dataSource: [],
        tag_id: '',
        get_tag: '',
        selected_list: '',
        isShow: false,
      }
  }

  componentDidMount(){
    this.getAllTags(this.get_tag)
  }

  toggleStatus(){
    this.setState({
      isShow:!this.state.isShow
    });
    console.log('toggle button handler: '+ this.state.isShow);
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
          <Button
            title="Back"
            onPress={() => this.backButton()}
          />
          {renderIf(this.state.status)(
          <Text style={styles.welcome}>
            I am dynamic text View
          </Text>
          )}
          <TouchableHighlight onPress={()=>this.toggleStatus()}>
          <Text>
            touchme
          </Text>
        </TouchableHighlight>
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
      <TouchableOpacity onPress={() => this._onPress(item.product_category_id, item.selected)}>
      <View>
        <Text>{item.product_type_name}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  _onPress(tag_id, selected_list){
    this.get_tag = selected_list;
    this.tag_id = tag_id;
    if(selected_list != ''){
      this.getAllTags(this.get_tag)
    }
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

  backButton(){

  }

  saveTag(){
    if(!this.tags_name){
      Alert.alert('Please enter name');
    } else {
      const formData = new FormData();

      if(!this.get_tag){
        formData.append('get_tag', "product");
        formData.append('id', "");
      } else {
        formData.append('get_tag', this.get_tag);
        formData.append('id', this.tag_id);
      }

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
            this.getAllTags(this.get_tag)
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

    getAllTags(get_tag){

      const formData = new FormData();

      if(!get_tag){
        formData.append('get_tag', "product");
        formData.append('id', "");
      } else {
        formData.append('get_tag', get_tag);
        formData.append('id', this.tag_id);
      }

      fetch(global.global_url+'get_all_tags.php',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: formData
      })
      .then((response) => response.json())
            .then((responseJson) => {
              var data = responseJson.array_tags.map(function(item) {
                return {
                  product_category_id: item.product_category_id,
                  product_type_name: item.product_type_name,
                  selected: item.selected
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