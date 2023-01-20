import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/Task';
import Details from '../components/Details';
import CreateTask from '../components/CreateTask'
import SortData from '../components/SortData';
import { Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons'; 
export default function Home() {
    const[tasksList, setTasksList] = useState([])
    const [sortModal, setSortModal]= useState(false)
    const [modal, setModal] = useState({
        visible: false,
        content: {}
    });
    const [createTaskVisible, setCreateTaskVisible] = useState(false);  
    const storeData = async (value) => {
        var json = JSON.stringify(value)
        try {
            await AsyncStorage.setItem('@logs_task', json)
        } catch (e) {
        }
    }
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@logs_task')
        if(value !== null) {
            console.log('getting data', value)
            setTasksList(JSON.parse(value))
        }
        } catch(e) {
        }
    }
    const clearAsyncStorage = async() => {
        Alert.alert('Delete All Tasks', 'Are you sure  you wanna delete all your tasks?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => {
                alert('deleted')
                storeData([])
                getData()
            }},
          ]);
    }
    useEffect(()=>{
        getData()
    }, [])
  return (
    <View style={styles.container}>
        <View style = {{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-evenly', marginBottom:'10%'}}>
            <Pressable onPress = {()=>{setCreateTaskVisible(true)}}>
                <Ionicons name="add-circle" size={40} color="black" />
            </Pressable>
            <Pressable onPress={()=>clearAsyncStorage()}>
                <MaterialCommunityIcons name="trash-can" size={40} color="black" />
            </Pressable>
            <Pressable onPress = {()=>{setSortModal(true)}}>
                <MaterialIcons name="sort" size={40} color="black" />
            </Pressable>
        </View>
        <CreateTask reload = {getData} createTask = {storeData} taskVisible={createTaskVisible} setTaskVisible = {setCreateTaskVisible}></CreateTask>
            <ScrollView contentContainerStyle = {styles.scrollview}>
                <View style={styles.taskContainer}>
                {
                    tasksList != [] &&
                    tasksList.map((element)=>(
                        <Task reload = {getData} key={element._id} TaskObject={element} setModal = {setModal}></Task>
                    ))
                }
                </View>
            </ScrollView>
        <Details modal={modal} setModal={setModal}></Details>
        <SortData reload = {getData} modal= {sortModal}  setModal = {setSortModal}></SortData>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }, 
  taskContainer:{
    alignContent:'center', 
    alignItems:'center',
    display:'flex',
    flexDirection:'column',
    width:'100%'
  },
  scrollview:{
    width:'100%',
  }
});
