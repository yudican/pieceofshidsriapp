import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function EducationDetail({route, navigation}) {
  const {title, content} = route.params;

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
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 18, letterSpacing: 1, color: '#6f706f'}}>
          {content}
        </Text>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#FF735C',
            alignItems: 'center',
            marginTop: 50,
          }}
          onPress={() => navigation.navigate('Education')}>
          <Text style={{fontSize: 20, color: '#fff'}}>Kembali</Text>
        </Pressable>
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
});
