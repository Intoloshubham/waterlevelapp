import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons} from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomConfirmationToast = ({
  isVisible,
  onClose,
  color,
  title,
  message,
  icon,
  onClickYes,
}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback
        //  onPress={onClose}
         >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack5,
            }}>
            <View
              style={{
                position: 'absolute',
                width: '85%',
                backgroundColor: COLORS.white,
                borderRadius:SIZES.base*0.5,
                ...styles.shadow,
              }}>
              <View
                style={{
                  padding: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: SIZES.base,
                  }}>
                  
                  <MaterialIcons name='height' color={COLORS.cyan_600} size={SIZES.body1*1.1}/> 
                  <Text style={{...FONTS.h2, color: COLORS.black, left: 2}}>
                   Tank Height
                  </Text>
                </View>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  {message}
                </Text>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{
                      right: 20,
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      borderRadius: 2,
                      backgroundColor: COLORS.cyan_600,
                    }}
                    onPress={onClose}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      borderRadius: 2,
                      backgroundColor: COLORS.cyan_600,
                    }}
                    onPress={onClickYes}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 20,
  },
});
export default CustomConfirmationToast;
