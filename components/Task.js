import { View, Text, StyleSheet,TouchableOpacity, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompareDates = ({ date1, date2 }) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);
    if (d1 > d2) {
      return <Entypo name="clock" size={24} color="black" />;
    } else if (d1 < d2) {
      return <Entypo name="warning" size={24} color="red" />;
    } else {
      return <Entypo name="warning" size={24} color="orange" />;
    }
}
  
export default function Task({setModal, TaskObject,  reload}) {
  const [date, setDate] = useState(new Date())
  const storeData = async (value, key) => {
    var json = JSON.stringify(value)
    try {
        await AsyncStorage.setItem(key, json)
    } catch (e) {
    // saving error
    }
  }
  const getData = async () => {
    const value = await AsyncStorage.getItem('@logs_task')
    if(value !== null) {
        // value previously stored
      return value
    }
    else{
      return []
    }
  }
  useEffect(()=>{
      setDate(new Date())
  }, [])
  function parseDate(date){
    date = new Date(date)
    var day = date.getUTCDate()
    var month =Number(date.getUTCMonth())+1
    var year = date.getFullYear()
    return day+'/'+month+'/'+year
  }
  function parseTime(time){
    time = new Date(time)
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;  
  }
 function sliceString(str, n_words) {
    return str.slice(0, n_words)+ '...';
  }
  async function handleDone(selectedItem){
    var datos = await getData()
    datos = JSON.parse(datos)
    datos = datos.filter(element => JSON.stringify(element) != JSON.stringify(selectedItem))
    var filteredItem = datos.filter(element => JSON.stringify(element) == JSON.stringify(selectedItem))
    console.log(datos)
    await storeData(datos, '@logs_task')
    await storeData(filteredItem, '@logs_done')
    await reload()
  }  
  async function handleDelete(selectedItem){
    var datos = await getData()
    datos = JSON.parse(datos)
    datos = datos.filter(element => JSON.stringify(element) != JSON.stringify(selectedItem))
    console.log(datos)
    await storeData(datos, '@logs_task')
    await reload()
  }
  return (
    <View style = {{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Pressable style = {styles.button} onPress={()=>handleDone(TaskObject)}>
        <AntDesign name="checkcircle" size={40} color="green" />
      </Pressable>
      <View style = {styles.container}>
          <Pressable onPress = {()=>{setModal({
            visible: true, 
            content:TaskObject
          })}}>
          <View style = {{        
              elevation:10,
              width:'100%',
              height:'100%',
              backgroundColor:'#fff',
              borderRadius:20,
              borderColor: TaskObject.priority == 1 ? "red": TaskObject.priority == 2?'green':'black',
              borderWidth:2,
              padding:20
          }}>
              <View style = {styles.item_top}>
                  <Text style = {styles.priority}>
                    {TaskObject.priority == 1 ? "High Priority": TaskObject.priority == 2?"Medium Priority":'Low Priority'}
                  </Text>
              </View>
              <View style = {styles.item_bottom}>
                  <Text style = {styles.description}>{sliceString(TaskObject.description, 40)}</Text>
              </View>
              {
                  TaskObject.deadline_date != undefined &&
                  <View style = {{display:'flex', flexDirection:'row', marginTop:10, justifyContent:'space-evenly', alignItems:'center'}}>
                      <Text style= {{ fontFamily:'Monserrat'}}>Deadline :</Text>
                      <View>
                        <Text>{parseDate(TaskObject.deadline_date)}</Text>
                        {
                          TaskObject.deadline_time != undefined &&
                          <View style = {{display:'flex', flexDirection:'row'}}>
                            <CompareDates date1 = {TaskObject.deadline_date} date2 = {date}></CompareDates>
                            <Text>{parseTime(TaskObject.deadline_time)}</Text>
                          </View>
                        }
                      </View>
                  </View>
              }
          </View>
          </Pressable>
      </View>
      <Pressable style = {styles.button} onPress={()=>handleDelete(TaskObject)}>
        <AntDesign  name="closecircle" size={40} color="red" />
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width:250,
        height: 150,
        marginBottom:10,
    },
    item_top:{
        display: 'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    },
    button:{
      margin:5
    },
    item_category:{
        backgroundColor:'yellow', 
        width:'auto', 
        textAlign:'center', 
        borderRadius:20
    }, 
    priority:{
        fontWeight:'700',
        fontFamily:'Monserrat',
    },
    description:{
      fontFamily:'Monserrat'
    }
})