import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight,ImageBackground, Image } from 'react-native';
import styles from './styles';
import { recipes , categories} from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';

export default class HomeScreen extends React.Component {

 
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  

  constructor(props) {
    super(props);
    this.state = {
      recipesData:recipes,
      categoriesData:categories,
      categorySelected: []
    }
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  onPressCategory = item => {
    let data = recipes;
    let categorySelected = this.state.categorySelected
    let indexOf = categorySelected.findIndex(e => item.id === e);
    indexOf >= 0 ? categorySelected.splice(indexOf, 1) : categorySelected.push(item.id)
  
    let res = data.filter((e)=> categorySelected.includes(e.categoryId))
    res = categorySelected.length === 0 ? recipes : res
    this.setState({
      recipesData:res,
      categorySelected
    })

  };

  renderCategory = ({ item, index }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
      <ImageBackground source={{ uri: item.photo_url }} style={styles.cardCategory}>
        <View style={{flex:1,backgroundColor:this.state.categorySelected.includes(item.id) ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)',justifyContent: 'center',
                    alignItems: 'center'}}>
          <Text style={[styles.category,{textAlign:'center',color:'white'}]}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={{paddingBottom:150}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.categoriesData}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.categoryId}`}
        />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.recipesData}
          renderItem={this.renderRecipes}
          
        />
      </View>
    );
  }
}
