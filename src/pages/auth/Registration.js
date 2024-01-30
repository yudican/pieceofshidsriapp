import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export function Registration({navigation}) {
  const [message, setMessage] = useState('');

  const [NIK, setNIK] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);

  function registerProcess() {
    setIsloading(true);

    const data = {
      identification_number: NIK,
      full_name: name,
      age: age,
      gender: gender,
      last_education: education,
      job: job,
      password: password,
    };

    const url = 'https://sri.pieceofshid.my.id/api/registration';

    axios
      .post(url, data, {timeout: 30000})
      .then(response => {
        console.log(response);

        setMessage('Registrasi berhasil silahkan login');
        setIsloading(false);
      })
      .catch(error => {
        console.log(error);

        setMessage('Terjadi kesalahan');
        setIsloading(false);
      });
  }

  return (
    <View style={style.container}>
      <View style={{marginTop: 70, padding: 20}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            letterSpacing: 1,
            color: '#FF735C',
          }}>
          Registrasi Akun SRI
        </Text>
        <Text style={{fontSize: 16, letterSpacing: 1}}>
          Masukkan identitsa anda
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, width: '100%'}}>
        <View style={[style.textinfo, {display: message ? 'block' : 'none'}]}>
          <Text style={{color: '#fff'}}>{message}</Text>
        </View>
        <View style={style.textinput}>
          <TextInput
            style={{width: '100%'}}
            onChangeText={NIK => {
              setNIK(NIK);
            }}
            placeholder="Nomor Induk Kependudukan"
            placeholderTextColor={'#6f706f'}
          />
        </View>
        <View style={style.textinput}>
          <TextInput
            style={{width: '100%'}}
            onChangeText={name => setName(name)}
            placeholder="Nama Lengkap"
            placeholderTextColor={'#6f706f'}
          />
        </View>
        <View style={style.textinput}>
          <TextInput
            style={{width: '100%'}}
            onChangeText={age => setAge(age)}
            placeholder="Umur"
            keyboardType="number-pad"
            placeholderTextColor={'#6f706f'}
          />
        </View>
        <View style={style.selectinput}>
          <RNPickerSelect
            placeholder={{label: 'Jenis Kelamin', value: null}}
            onValueChange={gender => setGender(gender)}
            items={[
              {label: 'Laki laki', value: 'male'},
              {label: 'Perempuan', value: 'female'},
            ]}
          />
        </View>
        <View style={style.selectinput}>
          <RNPickerSelect
            placeholder={{label: 'Pendidikan Terakhir', value: null}}
            onValueChange={education => setEducation(education)}
            items={[
              {label: 'SD', value: 'SD'},
              {label: 'SMP', value: 'SMP'},
              {label: 'SMA', value: 'SMA'},
              {label: 'Diploma', value: 'Diploma'},
              {label: 'Sarjana', value: 'Sarjana'},
            ]}
          />
        </View>
        <View style={style.textinput}>
          <TextInput
            style={{width: '100%'}}
            onChangeText={job => setJob(job)}
            placeholder="Pekerjaan"
            placeholderTextColor={'#6f706f'}
          />
        </View>
        <View style={style.textinput}>
          <TextInput
            style={{width: '100%'}}
            onChangeText={password => setPassword(password)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={'#6f706f'}
          />
        </View>
        <Pressable
          style={[style.btncontainer, {marginVertical: 20}]}
          onPress={() => registerProcess()}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: '600'}}>
            REGISTRASI
          </Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#FF753C'}}>Sudah punya akun? Login</Text>
        </Pressable>
      </View>
      <View
        style={[
          style.spinnercontainer,
          {display: isloading ? 'flex' : 'none'},
        ]}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'start',
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
  selectinput: {
    width: '100%',
    backgroundColor: 'rgba(255, 119, 60, 0.2)',
    borderRadius: 14,
    marginBottom: 10,
  },
  btncontainer: {
    backgroundColor: '#FF735C',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 28,
    backgroundColor: 'blue',
    borderRadius: 14,
    marginVertical: 10,
  },
});
