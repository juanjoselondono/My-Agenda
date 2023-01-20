import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
export default function Quotes() {
  const [quote, setQuote] = useState(1)
  useEffect(()=>{
    const getQuote = async()=>{
        let options = {
            method: 'GET',
            headers: { 'x-api-key': 'g4L5zU1CL1R0HwV/zxDnUQ==XPLhQtsl5vebl8IK' }
        }
        
        let url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational'
        
        try{
            await  fetch(url,options)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                setQuote(data[0])
            })
            .catch(err => {
                console.log(`error ${err}`)
            }); 
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
                <Text style = {styles.quote}>“{quote.quote}”</Text>
                <Text style = {styles.author}>{'-' + quote.author}</Text>
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
        color:'black',
        fontFamily: 'Monserrat'
    },
    author:{
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Monserrat'
    }
})