import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Voltar from '../assets/voltar.png';

export default function ScreenCam() {
  const camRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso Negado</Text>;
  }

  async function takePicture(){
    if(camRef){
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri);
        // console.log(data);
        setOpen(true);
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(()=>{
      alert('Salvo!')
      setOpen(false)
    })
    .catch(error=>{
      console.log('err', error);
    })
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
              <Image source={Voltar} style={styles.Flip}></Image>

                <TouchableOpacity style={styles.buttons} onPress={ takePicture }>
                    <FontAwesome name='camera' size={23} color="#FFF" />
                </TouchableOpacity>

          </TouchableOpacity>
        </View>
      </Camera>




      { capturedPhoto && 
        <Modal
            animationType='slide'
            transparent={true}
            visible={open}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>

              <View style={{margin: 10, flexDirection: 'row'}}>
                <TouchableOpacity style={{margin: 10}} onPress={() => setOpen(false)}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Não Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{margin: 10}} onPress={savePicture}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Salvar</Text>
                </TouchableOpacity>
              </View>
                

                <Image style={{width: '100%', height: '90%', borderRadius: 10}}
                source={{ uri: capturedPhoto}}/>


            </View>
        </Modal>
      }
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',

  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection:'row'
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttons:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 45,
    width: 150 ,
    margin: 20,
    alignSelf:'center',
    marginLeft: 55
  },
  Flip:{
    height:50,
    width:50,    
  },
  Flip2:{
    height:50,
    width:50,  
  },

});
