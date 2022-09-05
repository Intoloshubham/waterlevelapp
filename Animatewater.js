import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Animatewater = () => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <View style={styles.banner}>
      
     </View>
    </View>
  )
}

export default Animatewater

const styles = StyleSheet.create({
    banner:{
        width: 150,
        height: 150,
        position: "relative",
        background: "#000",
        borderRadius: 500,
        overflow: "hidden",
        borderWidth:2
      },
      before:{
        content: '',
        position: "absolute",
        background: "#04ACFF",
        width: "100%",
        bottom: 0,
        // animation: wipe 5s cubic-bezier(.2,.6,.8,.4) forwards;
      }
    //   @keyframes wipe {
    //     0% {
    //       height: 0;
    //     }
    //     100% {
    //       height: 100%;
    //     }
    //   }
})