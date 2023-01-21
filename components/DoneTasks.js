import { View, Text, Modal, StyleSheet, Pressable} from 'react-native'
import React, {useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DoneTasks({listOfTasks, modalVisible, setModalVisible, reload, reloadTask}) {
  useEffect(()=>{
    console.log('listOfTasks', typeof(listOfTasks))
  }, [])
  function sliceString(str, n_words) {
    return str.slice(0, n_words)+ '...';
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
  const getDone = async () => {
    const value = await AsyncStorage.getItem('@logs_done')
    if(value !== null) {
      return value
    }
    else{
      return []
    }
  }
  async function deleteItem(selectedItem){
    var datos = await getDone()
    datos = JSON.parse(datos)
    datos = datos.filter(element => JSON.stringify(element) != JSON.stringify(selectedItem))
    console.log(datos)
    await storeData(datos, '@logs_done')
    await reload([])
  }
  async function recoverItem(item){
      const arrayOfTasks = []
      var data = await getData()
      if(typeof(data) == 'string'){
        data = JSON.parse(data)
      }
      arrayOfTasks.push(item)
      data.forEach(element => {
        arrayOfTasks.push(element)
      });
      console.log('Array Of Tasks', arrayOfTasks)
      await storeData(arrayOfTasks, '@logs_task').then(()=>{
        alert('done')
        setModalVisible(false)
        reload([])
        reloadTask()
      })
      await deleteItem(item)
      
  }
  const storeData = async (value, key) => {
    var json = JSON.stringify(value)
    try {
        await AsyncStorage.setItem(key, json)
    } catch (e) {
    // saving error
    }
  }
  async function deleteAllItems(){
    await storeData([], '@logs_done')
    await setModalVisible(false)
    await reload([])
  } 
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}> 
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.textStyle}>
                        <AntDesign name="closecircleo" size={30} color="black" />
                    </Text>
            </Pressable>
                {
                    listOfTasks.map((item)=>(
                        <Pressable style = {styles.taskItem} onPress = {()=>{recoverItem(item)}} key={item._id}>
                            <Text style={styles.task_description} key = {item._id+1}>{sliceString(item.description, 20)}</Text>
                        </Pressable>
                    ))
                }
            <Pressable
                    style = {styles.deleteButton}
                    onPress={() => {
                      setModalVisible(true);
                      deleteAllItems()
                    }}>
                    <Text style={styles.deleteButtonText}>Clear</Text>
                    <AntDesign name="delete" size={40} color="white" />
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
        justifyContent:'center',
        justifyItems:'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'100%',
        height:'100%'
    },
    taskItem:{
        textAlign:'center',
        padding:10, 
        elevation:7,
        borderRadius:10,
        backgroundColor:'white',
        width:'80%', 
        textAlign:'center',
        marginTop:'5%',
        marginBottom:'5%', 

    },
    task_description:{
        fontSize:20,
        textAlign:'center',
        fontFamily:'Monserrat'
    },
    deleteButton:{
      textAlign:'center',
      padding:10, 
      elevation:7,
      borderRadius:10,
      backgroundColor:'#00b4fc',
      width:'40%', 
      textAlign:'center',
      marginTop:'10%',
      marginBottom:'10%', 
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    deleteButtonText:{
      fontSize:20,
      elevation:7,
      color:'white',
      fontFamily:'Monserrat'
    }
})
