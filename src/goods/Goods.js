import React, { Component } from 'react';
import {View, Text, FlatList, Dimensions ,ScrollView, Image,TextInput,StyleSheet } from 'react-native';

const {width} = Dimensions.get('window');

export default class Goods extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<6; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            data,
            
        }
    }
   
    render() {
        return (
            <View>
                {/* horizontal:实现水平滚动 */}
                {/* numColumns:实现分栏布局 */}
                
                <FlatList 
                    ListHeaderComponent={
                   
                        <View style={{backgroundColor:'white',height:120,position:'relative'}}>
                            <View style={{width:'84%',height:'35%',marginTop:'2%',marginLeft:'8%',flexDirection:'row',alignItems:'center',backgroundColor:'#eeeeee',float:'left',color:'#eee'}}>
                                        
                                <TextInput  placeholder="请输入商品名称" placeholderTextColor='#999' />
                                <Image style={{width:20,height:20,position:'absolute',right:'5%'}} source={require('../../assets/icon/search.png')} />
                            </View>
                            <View style={{width:'100%',height:'1%',backgroundColor:'#eee',position:'absolute',top:65}}></View>
                            <View style={{width:'100%',height:'35%',position:'absolute',top:72,flexDirection:'row'}}>
                                <View style={{width:'20%',color:'#000',justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'red',fontSize:16}}>综合</Text></View>
                                <View style={{width:'20%',color:'#000',justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#333',fontSize:16}}>销量</Text></View>
                                <View style={{width:'20%',color:'#000',justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#333',fontSize:16}}>新品</Text></View>
                                <View style={{width:'20%',color:'#000',justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#333',fontSize:16}}>价格</Text></View>
                                <View style={{width:'20%',color:'#000',justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#333',fontSize:16}}>信用</Text></View>
                            </View>
                        </View>
                        
                    }
                    // ListFooterComponent={<Text>底部</Text>}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={
                        ({})=><View style={{flexDirection:'row'}}>
                            <View style={styles.slide}>
                                <Image style={{width:150,height:150,position:'absolute',justifyContent: 'center',top:'10%'}} source={require('../../assets/1.jpg')} />
                                <Text style={{color:'#666',width:width*0.4,height:50,position:'absolute',top:'70%',paddingLeft:'3%',paddingRight:'3%',fontSize:14.5}}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                                <Text style={{color:'red',width:width*0.4,height:50,position:'absolute',top:'87%',paddingLeft:'3%',fontSize:13}}>36.00</Text>
                            </View>
                            <View style={styles.slide}>
                                <Image style={{width:150,height:150,position:'absolute',justifyContent: 'center',top:'10%'}} source={require('../../assets/2.jpg')} />
                                <Text style={{color:'#666',width:width*0.4,height:50,position:'absolute',top:'70%',paddingLeft:'3%',paddingRight:'3%',fontSize:14.5}}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                                <Text style={{color:'red',width:width*0.4,height:50,position:'absolute',top:'87%',paddingLeft:'3%',fontSize:13}}>36.00</Text>
                            </View>
                        </View>
                    }
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        width: 200,
        height: 40,
        color: '#fff',
        textAlignVertical: 'center',
        borderRadius: 20,
        backgroundColor: 'red'
    },
    slide:{
        width: width*0.46,
        height: 300,
        marginLeft: width*0.03,
        marginTop:10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})