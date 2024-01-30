import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {setSignOut} from '../redux/slice/AuthSlice';

export default function Profile({navigation}) {
  const information = useSelector(state => state.auth.information);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(setSignOut());
  }

  useEffect(() => {
    if (information.length <= 0) {
      console.log('kosong');
    } else {
      console.log(information);
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{width: '100%', paddingVertical: 20, paddingHorizontal: 40}}>
          {information.length <= 0 ? null : (
            <Pressable
              style={style.button}
              onPress={() =>
                navigation.navigate('Detail Profile', {
                  information: information,
                })
              }>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#8E8E8F'}}>
                Informasi Pribadi
              </Text>
            </Pressable>
          )}
          <Pressable
            style={style.button}
            onPress={() => navigation.navigate('Education')}>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#8E8E8F'}}>
              Mengenal Tuberculosis Paru
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 52,
              backgroundColor: '#FF735C',
              borderWidth: 1,
              borderColor: '#FF735C',
              borderRadius: 22,
            }}>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#fff'}}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
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
});
