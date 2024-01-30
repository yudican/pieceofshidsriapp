import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';

export default function KualitasHidup({route, navigation}) {
  const token = useSelector(state => state.auth.token);
  const {type} = route.params;
  const url = `https://sri.pieceofshid.my.id/api/form?type=${type}`;
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState('');

  function getForm() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      timeout: 30000,
    };

    axios
      .post(url, {}, config)
      .then(response => {
        console.log(response);

        setForm(response.data.responses.google_form_url);

        setLoading(false);
      })
      .catch(error => {
        console.log(error);

        setLoading(false);
      });
  }

  useEffect(() => {
    var titleHeader;

    if (type == 'quality') {
      titleHeader = 'Kuisioner Kualitas Hidup';
    } else if (type == 'efikasi') {
      titleHeader = 'Kuisioner Efikasi Diri';
    } else if (type == 'kepatuhan') {
      titleHeader = 'Kuisioner Kepatuhan Minum Obat';
    } else {
      titleHeader = 'Kuisioner';
    }

    navigation.setOptions({
      title: titleHeader,
    });
    getForm();
  }, []);

  return loading ? (
    <View style={style.container}>
      <Text>Loading data...</Text>
    </View>
  ) : form != '' ? (
    <WebView style={style.container} source={{uri: form}} />
  ) : (
    <View style={style.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '500',
          letterSpacing: 1,
          color: '#FF735C',
        }}>
        Formulir belum tersedia
      </Text>
    </View>
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
