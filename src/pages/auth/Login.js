import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/slice/AuthSlice';

const screewidth = Dimensions.get('window').width;
const screeheight = Dimensions.get('window').height;

const RPW = percentage => {
  return (percentage / 100) * screewidth;
};

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [isloading, setIsloading] = useState(false);

  function loginProcess(username, password) {
    if (username == '' || password == '') {
      setErrormsg('Kolom harus diisi');
    } else {
      setIsloading(true);

      const url = 'https://sri.pieceofshid.my.id/api/login';
      const options = {
        username: username,
        password: password,
      };

      axios
        .post(url, options, {timeout: 5000})
        .then(response => {
          console.log(response);

          const user = {
            isLoggin: true,
            user_id: response.data.user_id,
            token: response.data.access_token,
            information: response.data.information,
          };

          dispatch(setSignIn(user));
          setIsloading(false);
        })
        .catch(error => {
          console.log(error);

          if (error.hasOwnProperty('response')) {
            setErrormsg(error.response.data.message);
          } else if (error.hasOwnProperty('message')) {
            setErrormsg(error.message);
          } else {
            setErrormsg('Terjadi kesalahan');
          }

          setIsloading(false);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', position: 'absolute', top: 100}}>
        <View style={{width: 250, height: 200}}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={{
              uri: 'https://st4.depositphotos.com/39742510/41914/v/450/depositphotos_419146228-stock-illustration-vector-illustration-girl-portrait-girl.jpg',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#FF753C',
            marginTop: 40,
            marginBottom: 20,
          }}>
          LOGIN
        </Text>
        <View style={{paddingHorizontal: 20, width: RPW(90)}}>
          <View style={styles.textinput}>
            <TextInput
              style={{width: '80%', color: '#000'}}
              placeholder="Username"
              onChangeText={username => setUsername(username)}
              placeholderTextColor={'#6f706f'}
            />
            <MaterialCommunityIcons
              name="account"
              color={'#FF735C'}
              size={18}
            />
          </View>
          <View style={styles.textinput}>
            <TextInput
              style={{width: '80%', color: '#000'}}
              placeholder="Password"
              onChangeText={password => setPassword(password)}
              placeholderTextColor={'#6f706f'}
              secureTextEntry={true}
            />
            <MaterialCommunityIcons name="key" color={'#FF735C'} size={18} />
          </View>
          <Pressable
            style={[styles.btncontainer, {marginVertical: 20}]}
            onPress={() => loginProcess(username, password)}>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: '600'}}>
              LOGIN
            </Text>
          </Pressable>
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
            onPress={() => navigation.navigate('Registration')}>
            <Text style={{color: '#FF753C'}}>Registrasi Akun</Text>
          </Pressable>
        </View>
        <View
          style={[styles.texterror, {display: errormsg ? 'block' : 'none'}]}>
          <Text style={{color: '#fff'}}>{errormsg}</Text>
        </View>
      </View>
      <View
        style={[
          styles.spinnercontainer,
          {display: isloading ? 'flex' : 'none'},
        ]}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  spinnercontainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(224, 222, 222, 0.5)',
  },
  textinput: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 28,
    width: '100%',
    backgroundColor: 'rgba(255, 119, 60, 0.2)',
    borderRadius: 14,
    marginBottom: 10,
  },
  texterror: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 28,
    backgroundColor: '#f74f43',
    borderRadius: 14,
    marginVertical: 10,
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
