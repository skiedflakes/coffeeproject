import * as React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';

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
      productName: '',
      selectTags: '',
    }
  }
  
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.chooseImage}>
          <Text>Choose File</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.launchCamera}>
          <Text>Directly Launch Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.launchImageLibrary}>
          <Text>Directly Launch Image Library</Text>
        </TouchableOpacity>

        <View style={{marginTop: 10}}>
        <TextInput
              placeholder = "Enter name here..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {(text) => this.productName = text}/>
        </View>

        <Dropdown style={{flex: 1}}
              underlineColorAndroid="transparent"
              label={'Select Tags'}
              labelFontSize={12}
              labelTextStyle={styles.dropdownLabel}
              itemTextStyle={styles.dropdownItem}
              style={styles.dropdownMainText}                         
              style = {{color: '#252525'}}
              baseColor={'#252525'}
              value={'Paper'}
              data={[
                {
                  value: 'Banana', id: '1',
                }, {
                  value: 'Mango', id: '2',
                }, {
                  value: 'Pear', id: '3',
                }]}
              onChangeText={this.onChangeText}
          />
          
          <Button
            title="Save"
            onPress={() => this.saveProduct()}
          />

      </View>
    );
  }

  onChangeText = (value, index, data) => {
    const cityId = data[index].id;
    this.selectTags = cityId
  };

  saveProduct(){
    Alert.alert(this.productName+" "+this.selectTags);

    const formData = new FormData();
          formData.append('image', {
            uri: this.state.fileUri,
            name: 'my_photo.png',
            type: 'image/png'
          });
          formData.append('Content-Type', 'image/png');

    fetch('http://192.168.1.219/cafeproject/save_product.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.text);     
        })
        .catch((error) => {
          console.log(error);
      });
  }

  test(){
    fetch('http://192.168.1.219/cafeproject/test.php', {
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

            console.log(responseJson);

          }).catch((error) => {
            console.error(error);
          });
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
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
        console.log('responseuri', JSON.stringify(response.uri));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
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
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
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
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
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
});

