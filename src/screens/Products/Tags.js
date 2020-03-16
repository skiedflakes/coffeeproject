import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert, FlatList } from 'react-native';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        tags_name: '',
        dataSource: []
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
      <View>
        <Text>
        {item.product_type_name} 
        </Text>
        <Text>
        {item.product_category_id} 
        </Text>
      </View>
    )
  }

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
    fetch('http://192.168.1.105/cafeproject/tags_save.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_type_name: this.tags_name
      })
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

    getAllTags(){
      fetch('http://192.168.1.105/cafeproject/tags_get_all.php')
      .then((response) => response.json())
            .then((responseJson) => {
              var data = responseJson.product_data.map(function(item) {
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