import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react'
function parseDate(date){
    var day = date.getUTCDate()
    var month =Number(date.getUTCMonth())+1
    var year = date.getFullYear()
    return day+'/'+month+'/'+year
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
                <Text>
                    <Text style={styles.title}>category:</Text>
                    {modal.content.category}
                </Text>
                <Text>
                    <Text style = {styles.title}>priority: </Text>
                    {modal.content.priority}
                </Text>
                {
                    modal.content.deadline != undefined &&
                    <Text>
                        <Text style = {styles.title}>
                            Deadline:
                        </Text>
                        {parseDate(modal.content.deadline)}
                    </Text>
                }
                <Text style = {{marginTop:'10%', marginBottom:'10%'}}><Text style = {styles.title}>Description: </Text>{modal.content.description}</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModal({visible:'false', content: {}})}>
                <Text style={styles.textStyle}>Got it</Text>
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
    margin: 20,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title:{
    color:'blue', 
    textAlign:'left'
  }
})