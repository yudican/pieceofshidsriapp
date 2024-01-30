import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Kuisioner({navigation}) {
  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          backgroundColor: '#FF735C',
          width: '100%',
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            color: '#fff',
            letterSpacing: 1,
          }}>
          Kuisioner
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{width: '100%', paddingHorizontal: 20, marginTop: 5}}>
          <Pressable
            style={style.button}
            onPress={() =>
              navigation.navigate('Kualitas Hidup', {type: 'quality'})
            }>
            <Text style={style.buttonlabel}>Kualitas Hidup</Text>
          </Pressable>
          <Pressable
            style={style.button}
            onPress={() =>
              navigation.navigate('Kualitas Hidup', {type: 'efikasi'})
            }>
            <Text style={style.buttonlabel}>Efikasi Diri</Text>
          </Pressable>
          <Pressable
            style={style.button}
            onPress={() =>
              navigation.navigate('Kualitas Hidup', {type: 'kepatuhan'})
            }>
            <Text style={style.buttonlabel}>Kepatuhan Minum Obat</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF735C',
    borderRadius: 22,
    marginBottom: 22,
  },
  buttonlabel: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '400',
    color: '#FF735C',
  },
});
