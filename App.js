//import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from "./Login";
import React, { useState, useEffect } from 'react';




const axios = require("axios");


export class HomeScreen extends React.Component {

  _GOOGLE_URL = "https://www.googleapis.com/oauth2/v3/userinfo?access_token="

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null

    }
  }


  ComponentDidMount() {
    console.log("hola");
    let token = this.props.route.params.auth.accessToken;
    this.getUserInfo(token)
  }

  getUserInfo(token) {
    console.log("User info");
    console.log(token);
    axios.get(_GOOGLE_URL + token).then(resp => {
      console.log(resp.data);
      this.setState({ userInfo: resp.data });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>POKEDEX!</Text>
        <Image source={{ uri: "https://media.tenor.com/images/39d6060576a516f1dd437eafccafbdb1/tenor.gif" }}
        />

        <Text>Nombre: {this.state.userInfo?.name}</Text>
        <Text>Email: {this.state.userInfo?.email}</Text>
      </View>



    );

  }

}


const Pokemons = props => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };

  return (
    <View>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Buscar Pokemon"
          onChangeText={value => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                >
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name
                        }.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};



const Drawer = createDrawerNavigator();


function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Home" component={HomeScreen.bind(this)} />
        <Drawer.Screen name="Pokedex" component={Pokemons.bind(this)} />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

}
);

