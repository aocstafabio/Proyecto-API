import * as React from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';




function HomeScreen(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>POKEDEX!</Text>
            <Image source = {{uri: "https://media.tenor.com/images/39d6060576a516f1dd437eafccafbdb1/tenor.gif"}}
                   style = {styles.img}
                   />

        </View>
    );
}

const styles ={
    img : {
        height : 400,
        width : 400,
        justifyContent : 'center',
        alignItems : 'center'
    }

}

 class Pokedex extends React.Component {

    

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        img: '#',
      }
    }

    
  
  
    fetchJale = async () => {
  
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
      let data = await res.json()
  
      console.log(data.name);
      console.log(data.sprites.front_default)
      this.setState({
        img: data.sprites.front_default
      })
    }
  
  
    handleName = event => {
      this.setState({
        name: event.target.value
      })
    }
  
  
    handleSubmit = event => {
      var evento = this.state.name;
      console.log(evento)
      alert(evento)
      this.fetchJale()
      this.setState({ name: '', })
      event.preventDefault()
    }
  
//
    render() {
      return (
        <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Ingrese el Pokemon</label>
            <br />
            <br />
            <input
              type="text"
              placeholder="Ingrese el nombre"
              value={this.state.name}
              onChange={this.handleName} />
            <br />
            <br />
            <button type="submit"> Aceptar </button>
          </form>
          <br />
          <br />
          <img src={this.state.img} />
        </div>
      </div>
      );
    }
}

const Drawer = createDrawerNavigator();


function App() {

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Pokedex" component={Pokedex.bind(this)} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;

/* (POKEMONES A BUSCAR)
bulbasaur
ivysaur
venusaur
charmander
charmeleon
charizard
squirtle*/