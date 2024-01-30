import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function Card({title, content}) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {backgroundColor: '#fff', marginTop: 12, padding: 15, marginBottom: 5},
      ]}>
      <Text
        style={{
          marginBottom: 15,
          color: '#FF735C',
          fontWeight: 'bold',
          letterSpacing: 1,
        }}>
        {title}
      </Text>
      <Text numberOfLines={2} style={{color: '#6f706f'}}>
        {content}
      </Text>
      <Pressable
        style={{
          marginTop: 12,
          borderTopWidth: 1,
          borderTopColor: '#FF735C',
          paddingTop: 12,
        }}
        onPress={() =>
          navigation.navigate('Detail Edukasi', {
            title: title,
            content: content,
          })
        }>
        <Text style={{fontWeight: '400', color: '#000', textAlign: 'right'}}>
          Selengkapnya
        </Text>
      </Pressable>
    </View>
  );
}

export default function Education() {
  const token = useSelector(state => state.auth.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function getData() {
    const url = 'https://sri.pieceofshid.my.id/api/education';

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .post(url, {}, config)
      .then(response => {
        setData(response.data.responses.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View style={style.container}>
      <Text>Loading data...</Text>
    </View>
  ) : (
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
          Health Education
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <FlatList
          data={data}
          style={{width: '100%', paddingHorizontal: 20, marginTop: 5}}
          renderItem={({item}) => (
            <Card title={item.title} content={item.content} />
          )}
          keyExtractor={item => item.id}
        />
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
