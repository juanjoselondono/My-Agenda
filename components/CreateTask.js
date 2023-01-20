import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput, SafeAreaView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateTask ({taskVisible, setTaskVisible, createTask, reload}){
  const [text, onChangeText] = useState('');
  const [selectedCategory, setSelectCategory] = useState('personal');
  const [selectedPriority, setSelectedPriority] = useState('high')
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedTime, setSelectedTime] = useState(undefined)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@logs_task')
    if(value !== null) {
      return value
    }
    else{
      return []
    }
}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirmDate = (date) => {
    console.log("A date has been picked: ", date);
    setSelectedDate(date)
    hideDatePicker();
  };
  const handleConfirmTime = (date) => {
    console.log("A Time has been picked: ", date);
    setSelectedTime(date)
    hideTimePicker();
  };
  async function createNewTask(){
    const arrayOfTasks = []
    var data = await getData()
    if(typeof(data) == 'string'){
      data = JSON.parse(data)
    }
    data.forEach(element => {
      arrayOfTasks.push(element)
    });
    const TaskObject = {
      description: text,
      category: selectedCategory,
      priority: selectedPriority,
      deadline_date:selectedDate,
      deadline_time: selectedTime,
      _id: `${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 10)}`
    }
    arrayOfTasks.push(TaskObject)
    console.log('Array Of Tasks', arrayOfTasks)
    await createTask(arrayOfTasks).then(()=>{
      alert('done')
      setTaskVisible(false)
      onChangeText('')
      reload()
    })
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={taskVisible}
        onRequestClose={() => {
          setTaskVisible(!taskVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.modal_form}>
                <View style = {styles.modal_top}>
                    <Text style = {styles.modal_title}>Create New Task</Text>
                    <Pressable
                        onPress={() => setTaskVisible(!taskVisible)}>
                            <AntDesign name="closecircleo" size={40} color="black" />
                    </Pressable>
                </View>
                <View style = {styles.form_item}>
                    <Text style = {styles.form_item_title}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder = "Description"
                        value={text}
                        multiline
                    />
                </View>
                <View style = {styles.form_item}>
                    <Text style = {styles.form_item_title}>Category</Text>
                    <Picker
                        prompt='Select Category'
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectCategory(itemValue)
                        }>
                        <Picker.Item label="Personal" value="personal" />
                        <Picker.Item label="University" value="uiversity" />
                    </Picker>
                </View>
                <View style = {styles.form_item}>
                    <Text style = {styles.form_item_title}>Priority</Text>
                    <Picker
                        prompt='Select Priority'
                        selectedValue={selectedPriority}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedPriority(itemValue)
                        }>
                        <Picker.Item label="High" value={1} />
                        <Picker.Item label="Medium" value={2} />
                        <Picker.Item label="Low" value={3} />
                    </Picker>
                </View>
                <View style = {styles.form_item_date}>
                    <Text style = {styles.form_item_title}>Deadline Date</Text>
                    <Pressable style={styles.form_item_input} onPress={showDatePicker}>
                      <Text style = {styles.form_item_label}>Select Date</Text>
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style = {styles.form_item_date}>
                <Text style = {styles.form_item_title}>Deadline Time</Text>
                    <Pressable style={styles.form_item_input} onPress={showTimePicker}>
                        <Text style = {styles.form_item_label}>Select Time</Text>
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                    />
                </View>
                <View style = {styles.form_item}>
                  <Pressable onPress={()=>{createNewTask()}} style={{backgroundColor:'#00b4fc', marginTop:'10%', elevation:10, marginRight:'10%', marginLeft:'10%', borderRadius:20}}>
                    <Text style={{padding:10, fontSize:20, textAlign:'center', color:'white'}}>Create</Text>
                  </Pressable>
                </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
    height:'100%'
  },
  modal_form:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    height:'100%'
  },
  modal_top:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-between',
    marginBottom:'30%'
  },
  modal_title:{
    fontSize:20,
    padding:10,
    borderRadius:5,
    marginRight:15,
    backgroundColor:'#fff',
    color:'black',
    elevation:10
  },
  input:{
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    width: 300
  },
  form_item:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    justifyItems:'center',
    alignContent:'center',
    alignContent:'center'
  },
  form_item_title:{
    fontSize:20,
    color:'#00b4fc'
  },
  form_item_label:{
    color:'black',
    textAlign:'center',
    fontSize:15,
  },
  form_item_input:{
    textAlign:'center',
    padding:10, 
    elevation:7,
    borderRadius:10,
    backgroundColor:'white',
    marginLeft: 10
  },
  form_item_date:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'5%'
  }
});

