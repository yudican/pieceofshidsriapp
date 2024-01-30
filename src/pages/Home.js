import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import days from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

export default function Home() {
  const [remindedstatus, setRemindedStatus] = useState(false);
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const url = `https://sri.pieceofshid.my.id/api/minum-obat?user=${user_id}`;
  const url_store = `https://sri.pieceofshid.my.id/api/minum-obat/store?user=${user_id}`;

  const [time, setTime] = useState(days());
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    timeout: 30000,
  };

  function cekStatusMinum() {
    axios
      .post(url, {}, config)
      .then(response => {
        console.log(response);

        setRemindedStatus(true);

        setScreenLoading(false);
      })
      .catch(error => {
        console.log(error);

        setRemindedStatus(false);

        setScreenLoading(false);
      });
  }

  function minumObat() {
    setLoading(true);

    axios
      .post(url_store, {}, config)
      .then(response => {
        console.log(response);

        setLoading(false);
        setRemindedStatus(true);
      })
      .catch(error => {
        console.log(error);

        setLoading(false);
        setRemindedStatus(false);
      });
  }

  useEffect(() => {
    setInterval(() => {
      setTime(days());
    }, 1000 * 1);

    cekStatusMinum();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.imgcontainer}>
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://img.freepik.com/free-vector/reminders-concept-illustration_114360-4278.jpg',
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 40,
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <Text style={style.label}>Self Reminder Interactive</Text>
        <Text style={style.sublabel}>{time.format('HH:mm')}</Text>
      </View>
      {screenLoading ? (
        <ActivityIndicator size="small" />
      ) : remindedstatus ? (
        <View
          style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={style.text}>
            Terimakasih sudah meminum obat hari ini
          </Text>
          <Text style={[style.text, {marginBottom: 12}]}>
            Semoga lekas membaik
          </Text>
        </View>
      ) : (
        <View
          style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[style.text, {marginBottom: 12}]}>
            Apakah anda sudah meminum obat ?
          </Text>
          {loading ? (
            <View style={style.btncontainer}>
              <Text style={{fontSize: 12, color: '#fff', fontWeight: '600'}}>
                Memproses
              </Text>
            </View>
          ) : (
            <Pressable style={style.btncontainer} onPress={() => minumObat()}>
              <Text style={{fontSize: 12, color: '#fff', fontWeight: '600'}}>
                Sudah Minum
              </Text>
            </Pressable>
          )}
        </View>
      )}
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
  imgcontainer: {
    width: 250,
    height: 250,
  },
  label: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FF735C',
  },
  sublabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6f706f',
  },
  text: {
    fontSize: 16,
    letterSpacing: 1,
    color: '#6f706f',
  },
  btncontainer: {
    backgroundColor: '#FF735C',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
