import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, AsyncStorage, ToastAndroid, BackHandler} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';


let rootUrl = 'https://www.fastmock.site/mock/98127e7810920db6fbb9adf74ae13b8e/api';
export default class Login extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      lusername: '',
      lpwd: '',
      isloading:false
    }
    AsyncStorage.getItem('lusername').then((res) => {
      if (res) {
        this.setState({
          username: res,
          lusername: res
        });
      }
    });
    AsyncStorage.getItem('lpwd').then((res) => {
      if (res) {
        this.setState({
          pwd: res,
          lpwd: res
        });
      }
    });
  }
  
  userhandle=(text)=>{
    //console.log(text);
    this.setState({username:text});
  }
  pwdhandle=(text)=>{
    //console.log(text);
    this.setState({pwd:text});
  }
  login=()=>{
    // myFetch.get('/topics',{limit:4})
    //   .then(res=>console.log(res))

    if (this.state.username !== '' && this.state.pwd !== '') {
      this.setState({
        isloading: true
      });
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd
      }).then(res=>{
        /*根据返回状态判断，正确时跳转页面
        if(res){}
        */
       if (res.data.username === this.state.lusername && res.data.pwd === this.state.lpwd) {
        AsyncStorage.setItem('user', JSON.stringify(res.data))
          .then(() => {
            this.setState({
              isloading: false
            });
            Actions.homePage();
          });
        } else {
          this.setState({
            isloading: false
          });
          ToastAndroid.show('用户名或密码错误',100);
        }
      });
    }else{
      ToastAndroid.show('输入为空',100);
    }
      
    
  }
  componentDidMount() {
    let now = 0;
    BackHandler.addEventListener('back', () => {
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        now = new Date().getTime();
        return true;
      }
    });
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
          <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.register()}>
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
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
        </View>
        {this.state.isloading?<View><Text>正在登陆</Text></View>:null}
      </View>
    );
  }
}