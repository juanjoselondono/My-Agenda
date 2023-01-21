import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import React from 'react'
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
export default function Details({modal, setModal}) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modal.visible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
        setModal({
            visible:false,
            content: {

            }
        });
    }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Pressable
                    onPress={() => setModal({visible:'false', content: {}})}>
                    <Text style={styles.close}>
                        <AntDesign name="closecircleo" size={40} color="black" />
                    </Text>
                </Pressable>
                <View style = {styles.details_item}>
                    <Text style={styles.title}>Category</Text>
                    <Text style={styles.description}>{modal.content.category}</Text>
                </View>
                <View style = {styles.details_item}>
                    <Text style={styles.title}>Priority</Text>
                      {
                        modal.content.priority == 1 &&
                        <Text style={styles.description}>High</Text>
                      }
                      {
                        modal.content.priority == 2 &&
                        <Text style={styles.description}>Medium</Text>
                      }
                      {
                        modal.content.priority == 3 &&
                        <Text style={styles.description}>Low</Text>
                      }
                </View>
                {
                    modal.content.deadline_date != undefined &&
                    <View style = {styles.details_item}>
                        <Text style = {styles.title}>
                            Deadline:
                        </Text>
                        <Text style={styles.description}>{parseDate(modal.content.deadline_date)}</Text>
                        <Text style={styles.description}>{parseTime(modal.content.deadline_time)}</Text>
                    </View>
                }
                  <View style = {styles.details_item}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{modal.content.description}</Text>
                </View>
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
    margin: 20,
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
  },
  title:{
    color:'#00b4fc', 
    textAlign:'left',
    fontSize:30
  },
  close:{
    marginTop:'20%',
    marginBottom:'20%'
  },
  details_item:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    textAlign:'center',
    justifyItems:'space-evenly',
    alignContent:'center',
    alignItems:'center'
  },
  description:{
    fontSize:20
  }
})