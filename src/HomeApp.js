import { StyleSheet, Text, View, TouchableOpacity, Image, } from "react-native";
import Camera from '../assets/camera.png'

function HomeApp({navigation}){
    return(
        
        <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenCam")}>
                    <Image source={Camera} style={styles.camera}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate("ScreenCam")}>
                    <Text style={{fontSize: 14, color: "white", textAlign: 'center', cursor: 'pointer'}}>Ir para Câmera</Text>
                </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#B5E6FA'
    },
    buttonHome: {
        alignItems: "center",
        justifyContent: "center",
        width: 115,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#590232',
        marginTop: 10,
    },
    camera:{
        width:80,
        height:80,
        marginTop: 100,
    }
})

export default HomeApp;
