import React, { Component } from 'react';
import {View, Text, FlatList, Dimensions ,ScrollView, Image,TextInput,StyleSheet,StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import { Grid, Icon } from '@ant-design/react-native';
import Button from 'react-native-button';

const {width} = Dimensions.get('window');

const types = [
    {
        title: '居家维修保养',
        img: require('../../assets/l1.jpg')
    },
    {
        title: '住宿优惠',
        img: require('../../assets/l2.jpg')
    },
    {
        title: '出行接送',
        img: require('../../assets/l3.jpg')
    },
    {
        title: 'E族活动',
        img: require('../../assets/l4.jpg')
    },
    
]

export default class Home extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'#f5f5f5'}}>
            <View style={{flex: 1,}}>
                <StatusBar backgroundColor="red" />
                <View style={{backgroundColor:'#f23030',height:70,position:'relative'}}>
                    <View style={{width:'80%',height:'60%',marginTop:'3%',marginLeft:'5%',flexDirection:'row',alignItems:'center',backgroundColor:'white',float:'left',opacity:0.6,borderRadius:20}}> 
                                    
                        <Image style={{width:30,height:30,position:'absolute',left:'5%'}} source={require('../../assets/icon/search2.png')} />
                        <TextInput style={{position:'absolute',left:'10%',fontSize:17}}  placeholder="请输入您要搜索的关键字" placeholderTextColor='white' />
                    </View>
                    <Image style={{width:40,height:40,position:'absolute',top:'20%',right:'4%'}} source={require('../../assets/icon/car.png')}/>                       
                </View>

                <View style={{width:width,height:200}}>
                    {/* <ScrollView horizontal={true} pagingEnabled={true} style={{}} > */}
                    <Swiper autoplay={true} paginationStyle={{bottom: 10}}
                            dot={<View style={{           //未选中的圆点样式
                                backgroundColor: 'white',
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginLeft: 10,
                                marginRight: 10,
                                
                            }}/>}
                            activeDot={<View style={{    //选中的圆点样式
                                backgroundColor: '#fd0304',
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginLeft: 10,
                                marginRight: 10,
                            }}/>}

                    >
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/b2.jpg')} />
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/b1.jpg')} />
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/b2.jpg')} />
                    </Swiper>  
                    {/* </ScrollView> */}
                </View>

                
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={types}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={{width:width,marginTop:'2%',backgroundColor:'white'}}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{width:80,height:80,marginTop:5,marginLeft:20,marginBottom:5}}
                            />
                            <Text style={{position:'absolute',top:'35%',left:'30%',fontSize:19,color:'#333'}} >{item.title}</Text>
                            <Icon name="right" color="#d8d8d8" style={{position:'absolute',top:'35%',right:'5%'}} />
                            
                        </View>
                    )}
                    
                />
                <Button style={styles.btn}>发布需求</Button>
                
                <Text style={{marginLeft:'40%',marginBottom:5,color:'#767676',alignItems:'center',justifyContent:'center'}}>©E族之家   版权所有</Text>
                
            </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    btn:{
        width: width*0.8,
        height: 40,
        color: '#fff',
        alignItems:'center',
        textAlignVertical:'center',
        borderRadius: 5,
        backgroundColor: '#f23030',
        marginTop:'3%',
        marginLeft:'10%',
        marginBottom:'5%'
    },
})