import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SortData({modal, setModal, reload}) {
    const storeData = async (value, key) => {
        var json = JSON.stringify(value)
        try {
            await AsyncStorage.setItem(key, json)
        } catch (e) {
        }
    }
    const getData = async () => {
        const value = await AsyncStorage.getItem('@logs_task')
        if(value !== null) {
          return value
        }
        else{
        return []
        }
    }
    function sortObjectByOldestDate(obj) {

      return obj.sort(function(a, b) {
        return new Date(a.deadline_date) - new Date(b.deadline_date);
      });
    }
    async function sortByCategory(){
        var datos = await getData()
        datos = JSON.parse(datos)
        datos = sortObjectByOldestDate(datos)
        console.log(datos)
        await storeData(datos, '@logs_task')
        setModal(false)
        await reload()
    }
    async function sortByPriority(){
      var datos = await getData()
      datos = JSON.parse(datos)
      datos = datos.sort((a, b) => a.priority - b.priority);
      console.log(datos)
      await storeData(datos, '@logs_task')
      setModal(false)
      await reload()
  }     
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modal}
    onRequestClose={() => {
        setModal(false);
    }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModal({visible:'false', content: {}})}>
                    <Text style={styles.textStyle}>
                        <AntDesign name="closecircleo" size={30} color="black" />
                    </Text>
                </Pressable>
                <Pressable onPress={()=>{alert('hi')}} style = {styles.sort_item}>
                    <Text style = {styles.sort_item_text}>Sort By Category</Text>
                </Pressable>
                <Pressable onPress={()=>{sortByCategory()}} style = {styles.sort_item}>
                    <Text style = {styles.sort_item_text}>Sort By Deadline</Text>
                </Pressable>
                <Pressable onPress={()=>{sortByPriority()}} style = {styles.sort_item}>
                    <Text style = {styles.sort_item_text}>Sort By Priority</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'100%',
    height:'100%'
  },
  sort_item:{
    textAlign:'center',
    padding:10, 
    elevation:7,
    borderRadius:10,
    backgroundColor:'white',
    marginLeft: 10,
    width:'80%', 
    textAlign:'center',
    marginTop:'10%',
    marginBottom:'10%'
  },
  sort_item_text:{
    textAlign:'center',
    fontSize:20,
    fontFamily:'Monserrat'
  }
})