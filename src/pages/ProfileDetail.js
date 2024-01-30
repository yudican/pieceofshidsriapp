import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ProfileDetail({route, navigation}) {
  const data = route.params;

  const gender = data.information.gender == 'male' ? 'Laki laki' : 'Perempuan';

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
          Informasi Pribadi
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          paddingVertical: 80,
          paddingHorizontal: 35,
        }}>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Nomor Induk Kependudukan</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>
            {data.information.identification_number}
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Nama Lengkap</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>
            {data.information.full_name}
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Umur</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>
            {data.information.age}
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Jenis Kelamin</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>{gender}</Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Pendidikan Terakhir</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>
            {data.information.last_education}
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text style={{letterSpacing: 1}}>Pekerjaan</Text>
          <Text style={{fontSize: 18, color: '#FF735C'}}>
            {data.information.job}
          </Text>
        </View>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#FF735C',
            alignItems: 'center',
            marginTop: 50,
          }}
          onPress={() => navigation.navigate('Profile')}>
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
    backgroundColor: '#fff',
  },
});
