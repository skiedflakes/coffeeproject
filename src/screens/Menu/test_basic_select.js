import React,{useState,useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,View
} from 'react-native';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    selected:false
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    selected:false
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    selected:false
  },
];
class ItemPure extends React.PureComponent {
  render(){
    console.log('L44 rendewring with ID ==', this.props.id);
    return (
      <TouchableOpacity
        onPress={() => this.props.onSelect(this.props.id)}
        style={[
          styles.item,
          { backgroundColor: this.props.selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }

}



export default function FeedScreen () {
  // const [selected, setSelected] = React.useState(new Map());
  const[data,setData] = useState(DATA)

  const onSelect = useRef(id => {
    console.log('L62 id == ',id);
    console.log('L63 id == ',data);
    const newData = [
      ...data.map(item =>{
        if (id == item.id){
          return{
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      }),
    ];
    console.log('L63 mew data == ',newData);
    setData(newData);

    newData.map(mitem =>{
      console.log('L63 mew data == ',mitem.selected);
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
      
          <ItemPure
            id={item.id}
            selected={item.selected}
            title={item.title}
            onSelect={onSelect.current}
          />
        )}
        keyExtractor={item => item.id}
        extraData={item => item.selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
