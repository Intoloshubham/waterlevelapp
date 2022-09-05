import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  Button,
  icon,
  Card,
  Title,
  Paragraph,
  Avatar,
  Checkbox,
} from 'react-native-paper';

const Login = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const userLogin = () => {
    // const userdata = {
    //   username: username,
    //   password: password,
    // };
    if (username === 'abc' && password === '123') {
      setUserName('');
      setPassword('');
      alert(`Welcome ${username}`);
      navigation.navigate('WaterTank');
    } else {
      alert('user name or password incrrect');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          padding: 20,
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../waterlevelapp/img/userlogin.png')}
            style={{width: 200, height: 200}}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            label="user name"
            value={username}
            onChangeText={username => setUserName(username)}
          />
          <TextInput
            style={{marginTop: 5}}
            mode="outlined"
            label="password"
            secureTextEntry
            value={password}
            // right={<TextInput.Icon name="eye" />}
            onChangeText={password => setPassword(password)}
          />
          {/* <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
          <Button
            mode="outlined"
            onPress={() => userLogin()}
            style={{marginTop: 30}}>
            Login
          </Button>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Ragister')}>
          <Text
            style={{
              textAlign: 'right',
              marginTop: 10,
              fontSize: 15,
              color: 'red',
            }}>
            Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({});
