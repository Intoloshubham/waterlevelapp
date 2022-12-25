import React, {useState} from 'react';
import {API_URL} from '@env';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Modal,
  //   TextInput,
  Pressable,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {FONTS, COLORS, icons, SIZES} from '../constants';
import {TextInput} from 'react-native-paper';
import {CustomToast} from '../componets';
import {addProduct} from '../controllers/productController';
import axios from 'axios';

const Products = () => {
  const [productModal, setProductModal] = useState(false);
  const [productUniqueId, setProductUniqueId] = useState('');

  const [mssg, setMssg] = useState('');
  const [statusCode, setStatusCode] = useState('');

  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  const submitProductId = async () => {
    console.log('object');
    // const data = {product_id: productUniqueId};
    // const temp = await addProduct(data);
    
    // console.log(temp)
    // console.log('🚀 ~ file: Products.js:38 ~ submitProductId ~ temp', temp);

    // console.log("🚀 ~ file: Products.js:36 ~ submitProductId ~ data", data)

    // if (temp1.status==200) {
    //   setProductModal(true);
    //   // setProductUniqueId('');
    // }
 


    fetch('http://192.168.0.117:8000/api/add-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productUniqueId,
      }),
    })
      .then(response => {
        console.log('response--',response)
        }).catch(err=>console.log(err))
      // .then( responseJson => {
      //   console.log('getting data from fetch', responseJson);
      //   setTimeout(() => {
      //     // setLoading(false);
      //     setProductModal(false);
      //     // setDataSource(responseJson)
      //   }, 2000);
      // });

    // axios
    //   .post('http://192.168.0.117:8000/api/add-product', data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then(res => console.log('res----',res)
    //     )
    //   .then(res => console.log(res))
    //   .catch(err => {
    //     console.log(err);
    //   });
    // console.log('🚀 ~ file: Products.js:38 ~ submitProductId ~ temp', temp);
  };

  function renderAddProductModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={productModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => setProductModal(false)}>
            <Image
              source={icons.cross}
              style={{height: 35, width: 35, tintColor: COLORS.amber_300}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <TextInput
              mode="outlined"
              label="Product Unique Id"
              left={<TextInput.Icon icon="fingerprint" />}
              onChangeText={value => {
                setProductUniqueId(value);
              }}
              value={productUniqueId}
            />
            <TouchableOpacity
              style={{
                marginTop: 60,
                backgroundColor: COLORS.blue_600,
                borderRadius: SIZES.body4 * 0.5,
                alignItems: 'center',
                padding: 5,
              }}
              onPress={ ()=> submitProductId()}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        paddingVertical: SIZES.body1 * 2,
        // alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          alignContent: 'space-between',
        }}>
        <Image
          resizeMode="center"
          style={{
            height: '90%',
            alignSelf: 'center',
            tintColor: COLORS.lightGray1,
            width: '90%',
          }}
          source={icons.addProduct}
        />
        <Text style={{...FONTS.body2}}>Your Product list is empty</Text>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>
          Add Product Item with given unique Id
        </Text>
      </View>
      <View>
        <Pressable
          style={{
            borderWidth: 1,
            padding: SIZES.base,
            marginHorizontal: SIZES.body1 * 4.3,
            alignItems: 'center',
          }}
          onPress={() => {
            setProductModal(true);
          }}>
          <Text
            style={{
              ...FONTS.body4,
            }}>
            Add New Product
          </Text>
        </Pressable>
      </View>
      {renderAddProductModal()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={statusCode == 200 ? COLORS.green : COLORS.red}
        title={
          statusCode == 200
            ? 'Product Id registeration!'
            : 'Something Went Wrong'
        }
        message={mssg}
      />
    </View>
  );
};
export default Products;
