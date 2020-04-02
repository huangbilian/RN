/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,Image,BackHandler,ToastAndroid,AsyncStorage } from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal,Actions} from 'react-native-router-flux';
import { Grid, Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';

import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import Doc from './src/cart/Doc';
import SwiperPage from './src/common/SwiperPage';
import Publish from './src/userinfor/Publish';





const App= () => {
  let [val, setVal] = useState('1');
  let now = 0;

  console.disableYellowBox = true;

  const rootUrl = 'https://www.fastmock.site/mock/98127e7810920db6fbb9adf74ae13b8e/api';

  let [isLogin,setLogin] = useState(false);
  let [isInstall,setInstall] = useState(true);
  let init=() => {
    //AsyncStorage.removeItem('user');
    //AsyncStorage.clear()
    AsyncStorage.getItem('isInstall')
      .then(res=>{
        console.log('isInstall',res)
        if(res){
          setInstall(false);
        }
      })
    AsyncStorage.getItem('user')
      .then(res=>{
        let user = JSON.parse(res);
        console.log(user);
        if(!user){
          SplashScreen.hide();
        }
        if(user && user.token){
          SplashScreen.hide();
          setLogin(true);
          // console.log(isLogin);
          // console.log(res);
        }
      })
  }
  useEffect(()=>{
		init();
	},[])
  let afterInstall = ()=>{
    console.log('after install')
    setInstall(false);
  }
  if(isInstall){
    return <View style={{flex:1}}>
      <SwiperPage afterInstall = {afterInstall} />
    </View>
  }
  return (
    
    <Router 
      backAndroidHandler={()=>{
        if(Actions.currentScene != 'home'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-now<2000){
            BackHandler.exitApp();
          }else{
            ToastAndroid.show('确定要退出吗',100);
            now = new Date().getTime();
            return true;
          }
        }
        
      }}>

      <Overlay>
      <Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
    {/* 这种写法是将全部的跳转页面都放在Root下面 */}
      <Scene key="root">


        {/*实现 Tabs*/}
        <Tabs key='tabbar' hideNavBar activeTintColor='red' inactiveTintColor='#999999' tabBarStyle={{backgroundColor:'white'}}>
          {/*消息栏*/}
          <Scene key='homePage' title='首页' hideDrawerButton hideNavBar
              icon={
								({focused})=><Icon 
										color={focused?'red':'#999999'} 
                    name="home"
                    size={30}
									/>
					}> 
            <Scene key='home' component={Home} />
          </Scene>
          <Scene key='goodPage' hideDrawerButton hideNavBar
								icon={({focused})=>
									<Icon 
										color={focused?'red':'#999999'} 
                    name='appstore'
                    size={30}
                  />}
								title="商品分类"
            >
            <Scene key='goods' component={Goods} />
            {/* <Scene key='task1' component={Task1} /> */}
          </Scene>
          {/*文档栏*/}
          <Scene key='doc' hideDrawerButton hideNavBar
									icon={({focused})=>
										<Icon 
											color={focused?'red':'#999999'} 
                      name='shopping-cart'
                      size={30}
                    />}
									title="购物车"
            >
            <Scene key='doc' component={Doc} />
          </Scene>
          <Scene key='usePage' hideDrawerButton hideNavBar 
              icon={({focused})=>
                <Icon 
                  color={focused?'red':'#999999'} 
                  name='user'
                  size={30}
                />}
              title="个人中心"
              style={{backgroundColor:'red'}}
            >
            <Scene key='userinfor' component={Userinfor}/>
            {/* <Scene key='task3' component={Task3} /> */}
            <Scene key='publish' component={Publish} hideTabBar  />
          
          </Scene>
        </Tabs>

      </Scene>
      </Drawer>
				</Lightbox>
        <Scene initial={!isLogin} key="login" component={Login}/>
      </Modal>
      </Overlay>
    </Router>
  )
}

const styles = StyleSheet.create({
  
  box:{
		width:100,
		height:100,
		margin: 10,
		borderColor:'red',
		borderWidth:1,
	},
	box1:{
		width:100,
		height:100,
		margin: 10,
		borderColor:'red',
		borderWidth:1/1.5,
	},
  txt:{
    color:"red",
  },
  size:{
    fontSize:30
  }

});

export default App;
