import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, AsyncStorage, ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';


let rootUrl = 'https://www.fastmock.site/mock/98127e7810920db6fbb9adf74ae13b8e/api';
export default class Register extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      apwd:'',
      isloading:false
    }
  }
  userhandle=(text)=>{
    //console.log(text);
    this.setState({username:text});
  }
  pwdhandle=(text)=>{
    //console.log(text);
    this.setState({pwd:text});
  }
  apwdhandle = (text) => {
    //console.log(text);
    this.setState({ apwd: text })
  }
  
  register=()=>{
    if (this.state.username !== '' && this.state.pwd != '' && this.state.apwd != '') {
      if (this.state.pwd !== this.state.apwd) {
          ToastAndroid.show('密码不一致', 100);
      } else {
          this.setState({ isloading: true })
          myFetch.post('/register', {
              username: this.state.username,
              pwd: this.state.pwd
          }).then(res => {
              if (res.data.token == '1') {
                  console.log(res);
                  console.log(res.data.token);
                  ToastAndroid.show('账户已存在', 100);
              } else {
                  this.setState({ isloading: false });
                  AsyncStorage.setItem('lusername', this.state.username);
                  AsyncStorage.setItem('lpwd', this.state.pwd)
                    .then(() => {
                        Actions.login();
                    });
              }
          })
      }
    } else {
      ToastAndroid.show('输入不能为空！', 100);
    }
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput onChangeText={this.userhandle} placeholder="用户名" />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput onChangeText={this.pwdhandle} secureTextEntry={true} placeholder="密码" />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput onChangeText={this.apwdhandle} secureTextEntry={true} placeholder="确认密码" />
          </View>
          <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.register}>
                <Text>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.login()}>
                <Text>返回登录</Text>
            </TouchableOpacity>
        </View>
        {this.state.isloading?<View><Text>正在注册</Text></View>:null}
      </View>
    );
  }
}