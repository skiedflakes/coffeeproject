import * as React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert, ScrollView } from 'react-native';

export default class Input_Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      fileType: '',
      productName: '',
      selectTags: '',
      price: '',
      details: '',
      dataSource: [],
    }
  }

  componentDidMount(){
    this.getAllTags()
  }
  
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        
        {/* <TouchableOpacity onPress={this.launchCamera}>
          <Text>Directly Launch Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.launchImageLibrary}>
          <Text>Directly Launch Image Library</Text>
        </TouchableOpacity> */}

        <View style={{marginBottom: 15}}>
          {this.renderFileUri()}
          <TouchableOpacity style={{alignSelf: "center", marginTop: 5}} onPress={this.chooseImage}>
          <Text>Choose File</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input}
              placeholder = "Enter name here..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {(text) => this.productName = text}/>

        <TextInput style={styles.input}
              placeholder = "Enter price here..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {(text) => this.price = text}/>

        <TextInput style={styles.input}
              placeholder = "Enter details here..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {(text) => this.details = text}/>

        <Dropdown
              underlineColorAndroid="transparent"
              label={'Select Tags'}
              labelFontSize={12}
              labelTextStyle={styles.dropdownLabel}
              itemTextStyle={styles.dropdownItem}
              style={styles.dropdownMainText}                         
              style = {{color: '#252525'}}
              baseColor={'#252525'}
              value={'Select'}
              data={this.state.dataSource}
              onChangeText={this.onChangeText}
          />
          
          <Button
            title="Save"
            onPress={() => this.saveProduct()}
          />

      </View>
      </ScrollView>
    );
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        // source={require('./src/assets/galeryImages.jpg')}
        style={styles.images}
      />
    }
  }

  onChangeText = (value, index, data) => {
    const tag_id = data[index].id;
    this.selectTags = tag_id
    console.log(tag_id)
  };

  getAllTags(){
    fetch(global.global_url+'get_all_tags.php')
    .then((response) => response.json())
    .then((responseJson) => {
      var data = responseJson.array_tags.map(function(item) {
        return {
          id: item.product_category_id,
          value: item.product_type_name
        };
      });
      console.log(data)
      this.setState({
        dataSource: data
      })

    }).catch((error) => {
      console.error(error);
      Alert.alert('Connection Error');
    });
  }

  saveProduct(){
    if(!this.productName){
      Alert.alert('Please enter Product name');
    } else if(!this.price){
      Alert.alert('Please enter Product price');
    } else if(!this.selectTags){
      Alert.alert('Please select tag');
    } else if(!this.state.fileUri){
      Alert.alert('Please select image');
    } else {
      const formData = new FormData();
      formData.append('product_name', this.productName);
      formData.append('product_category_id', this.selectTags);
      formData.append('product_details', this.details);
      formData.append('price', this.price);
      formData.append('image', {
              uri: this.state.fileUri,
              name: 'my_photo',
              type: this.state.fileType
            });
      // formData.append('Content-Type', this.state.fileType);

      fetch(global.global_url+'save_product.php',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
            const first = responseJson.response[0]
            console.log(first)
            if(first.status == 'success'){
              Alert.alert('Success !');
            } 
            else if(first.status == 'duplicate'){
              Alert.alert('Duplicate !');
            }
            else {
              Alert.alert('Failed !');
            }    
          })
          .catch((error) => {
            console.log(error);
            Alert.alert('Connection Error');
        });
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image as',
      // customButtons: [
      //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response.type));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          fileType: response.type
        });
      }
    });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response_uri', JSON.stringify(response.data));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          fileType: response.type
        });
      }
    });
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(this.state.filepath));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          fileType: response.type
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
  dropdownLabel: {
    textTransform: 'uppercase',
    color: '#252525',
  },
  dropdownItem: {
    fontSize: 12,
    color: '#252525',
  },
  dropdownMainText: {
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    alignSelf: "center"
  },
  input: {
    marginBottom: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 }
});
