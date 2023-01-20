import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'

export default function Clock() {  
  const [date, setDate] = useState(new Date())
  useEffect(()=>{
    setDate(new Date())
  },[])
  function parseDate(date) {
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var strTime = month + '/' + day + '/' + year
    return strTime;
  }
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>UniGenda</Text>
      <Text style = {styles.date}>{parseDate(date)}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row'
    },
    title:{
        fontSize:20,
    },
    date:{
        fontSize:20,
        marginLeft:5,
        fontWeight:'600'
    }
})