import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Button } from 'react-native';

export function LoginScreen({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '636125429308-cgljqpevsa8pbtcni3eptb0ij84v7rpr.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      navigation.navigate("Home", { auth: response.authentication })
    }
  }, [response]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text> Ingresa con tu cuenta</Text>
      <Button title="Login" size="m"
        onPress={() => {
          promptAsync();
        }}>

      </Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

}
);
