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
        back_tag: '',
        selected_list: '',
        show: true,
        isTagsEmpty: false,
        selected_product: '',
        click_array: [],
      }
  }

  componentDidMount(){
    this.getAllTags(this.get_tag)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          placeholder = "Enter tag name here..."
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {(text) => this.tags_name = text}/>
        <Button
            title="Save tag"
            onPress={() => this.saveTag()}
          />
        
        {/* <Button title="Hide/Show Component" onPress={this.ShowHideComponent} /> */}
        
        <Text style={{marginTop: 20}}>{this.state.selected_product}</Text>

        {this.state.isTagsEmpty ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={this.renderItem}
          // keyExtractor={(item, index) => index}
          keyExtractor={item => item.product_category_id.toString()}
        />
        ) : <Text style={{alignItems: "center", margin: 50}}>No data found...</Text>}

        {this.state.show ? (
          <Button
          title="Refresh"
          onPress={() => this.backButton()}
        />
        ) : null}
      </View>
    );
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{width: 300, height: 30}} onPress={() => this._onPress(item.product_category_id, item.selected, item.product_type_name)}>
      <View>
        <Text>{item.product_type_name}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  _onPress(tag_id, selected_list, selected_product){
    this.get_tag = selected_list;
    this.tag_id = tag_id;

    let array=this.state.click_array;
    array.push(this.tag_id);
    this.setState({array})
    console.log(array)

    if(selected_list != ''){
      this.state.selected_product += " > "+selected_product;
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
    if(this.get_tag == 'header'){
      this.back_tag = '';
      this.get_tag = '';
    } else if(this.get_tag == 'details'){
      this.back_tag = 'header';
    }
    this.getAllTags('')
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
        this.setState({ show: false });
      } else {
        formData.append('get_tag', get_tag);
        formData.append('id', this.tag_id);
        this.setState({ show: true });
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

              if (this.state.dataSource && this.state.dataSource.length) {
                this.setState({ isTagsEmpty: true });
              } else {
                this.setState({ isTagsEmpty: false });
              }

              if(!get_tag){
                this.state.selected_product = '';
                this.setState({ show: false });
              } else {
                this.setState({ show: true });
              }
  
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
  input: {
    marginBottom: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
});