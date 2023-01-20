import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
export default function Quotes() {
  const [quote, setQuote] = useState(1)
  useEffect(()=>{
    const getQuote = async()=>{
        try{
            await axios.get('https://zenquotes.io/api/quotes').then((data)=>{
                console.log(data.data.slice(0,1))
                setQuote(data.data[0])
            })
        }
        catch(err){
            console.log(err)
        }
    }
    getQuote()
  },[])
  return (
    <View>
        {
            quote == 1 &&
            <Text> ... </Text>
        }
        {
            quote != 1 &&
            <View style = {styles.container}>
                <Text style = {styles.quote}>“{quote.q}”</Text>
                <Text style = {styles.author}>{'-' + quote.a}</Text>
            </View>
        }
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        margin:25
    },

    quote:{
        fontSize:20,
        color:'black'
    },
    author:{
        fontSize:20,
        fontWeight:'600'
    }
})