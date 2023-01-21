import { View, Text,StyleSheet, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneTasks from './DoneTasks';

export default function Stage({reload, reloadTasks}) {
  const [doneData, setDoneData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [doneReload, setDoneReload] = useState([])
  const getData = async () => {
    const value = await AsyncStorage.getItem('@logs_done')
    if(value !== null) {
        // value previously stored
      console.log('data done', value)
      setDoneData(JSON.parse(value))
      return value
    }
    else{
      return []
    }
  }
  useEffect(()=>{
    getData()
  }, [reload, doneReload])
  return (
  <>
    {
      JSON.stringify(doneData)!= JSON.stringify([]) &&
      <> 
        <Pressable style = {styles.container} onPress = {()=>{setModalVisible(true)}}>
          <Text style = {styles.stage_title}>Completed Tasks</Text>
          <Ionicons name="ios-rocket-sharp" size={30} color="white" />
        </Pressable>
        <DoneTasks reloadTask = {reloadTasks} reload = {setDoneData} listOfTasks={doneData} modalVisible = {modalVisible} setModalVisible = {setModalVisible}></DoneTasks>
      </>
    }
    </>

  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'green',
        position: 'absolute',
        bottom:0,
        left:0,
        width:'100%',
        height:'10%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    stage_title:{
        color:'white',
        fontFamily:'Monserrat',
        marginRight:10
    }
})
