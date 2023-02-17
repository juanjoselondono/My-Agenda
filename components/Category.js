import { View, Text, StyleSheet, Pressable, Modal, TextInput, ScrollView} from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Category({Reload}) {
  const [createCategory, setCreateCategory] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState(false)
  const [category, onChangeText] = useState('');
  const [listOfCategory, setListOfCategory] = useState([])
  const storeData = async (value, key) => {
    var json = JSON.stringify(value)
    try {
        await AsyncStorage.setItem(key, json)
    } catch (e) {
    // saving error
    }
  }
  const getCategory = async () => {
    const value = await AsyncStorage.getItem('@logs_category')
    if(value !== null) {
        // value previously stored
      setListOfCategory(JSON.parse(value))
      return value
    }
    else{
      return []
    }
  }
  async function createCategoryItem(input){
    if(input != ''){
        const arrayOfCategory = []
        var data = await getCategory()
        if(typeof(data) == 'string'){
        data = JSON.parse(data)
        }
        data.forEach(element => {
        arrayOfCategory.push(element)
        });
        arrayOfCategory.push(input)
        await storeData(arrayOfCategory, '@logs_category')
        Reload([])
    }
    else{
        alert('you have to enter a category!!')
    }
  }
  async function deleteCategoryItem(item){
    var datos = await getCategory()
    datos = JSON.parse(datos)
    datos = datos.filter(element => JSON.stringify(element) != JSON.stringify(item))
    await storeData(datos, '@logs_category')
    setListOfCategory(datos)
    Reload([])
  }
  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={createCategory}
        onRequestClose={() => {
          setCreateCategory(!createCategory);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create New Category</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={category}
                placeholder = "New category .."
            />
            <View style = {styles.form_item_button_container}>
            <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                    setCreateCategory(!createCategory)
                    createCategoryItem(category)
                }}>
                <Text style={styles.textStyle}>Create</Text>
                </Pressable>
                <Pressable
                style={[styles.buttonClose]}
                onPress={() => setCreateCategory(!createCategory)}>
                <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteCategory}
        onRequestClose={() => {
          setDeleteCategory(!deleteCategory);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select the category you want to remove</Text>
            <ScrollView style = {styles.listOfCategory_container}>
            {
                listOfCategory.map((item)=>(
                    <Pressable onPress = {()=>{deleteCategoryItem(item); setDeleteCategory(false)}} style = {styles.listOfCategory} key={item+1}>
                        <Text style = {{textAlign:'center', fontFamily:'Monserrat', fontSize:20}} key = {item}>{item}</Text>
                    </Pressable>
                ))
            }
            </ScrollView>
            <Pressable
                style={[styles.buttonClose]}
                onPress={() => setDeleteCategory(!deleteCategory)}>
                <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    <View style = {styles.form_item_button_container}>
        <Pressable style = {styles.form_item_button} onPress = {()=>{setCreateCategory(true)}}>
        <Text style = {styles.form_item_button_text}>New Category</Text>
        </Pressable>
        <Pressable style = {styles.form_item_button} onPress = {()=>{setDeleteCategory(true); getCategory()}}>
        <Text style = {styles.form_item_button_text}>Remove Category</Text>
        </Pressable>
    </View>
    </>
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
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'100%',
        height:'100%',
        justifyContent:'center'
      },
    form_item_button_container:{
        display:'flex',
        flexDirection:'row', 
        justifyContent:'space-evenly',
        marginTop:'5%'
      },
      form_item_button_text:{
        backgroundColor:'#d62828', 
        elevation:10,
        borderRadius:20,
        color:'white', 
        fontFamily:'Monserrat',
        padding:5
      },
      buttonClose:{
        backgroundColor:'#00b4fc', 
        elevation:10,
        borderRadius:20,
        color:'white', 
        fontFamily:'Monserrat',
        padding:10,
        color:'white',
        margin:'5%'       
      },
      modalText:{
        fontFamily:'Monserrat',
        fontSize:20,
        textAlign:'center',
        marginBottom:'20%'
      },
      input:{
        borderWidth:1,
        width:'80%',
        borderRadius:20,
        padding:10,
        textAlign:'center'
      },
      textStyle:{
        color:'white'
      },
      listOfCategory:{
        margin:'10%',
        textAlign:'center',
        padding:10,
        borderWidth:0.25,
        borderRadius:10
      },
      listOfCategory_container:{
        display:'flex',      
    }
})