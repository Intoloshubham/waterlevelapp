import React, {useState, useEffect} from 'react';
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
  FlatList,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {FONTS, COLORS, icons, SIZES} from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {CustomToast} from '../componets';
import {
  addProduct,
  getProduct,
  updateProduct,
} from '../controllers/productController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {addSliceProduct} from '../redux/productSlice';
import {useSelector} from 'react-redux';

const Products = ({navigation}) => {
  const dispatch = useDispatch();
  const creds = useSelector(state => state.userCreds);
  let userId = creds.user_credentials._id;
  const [productModal, setProductModal] = useState(false);
  const [productUniqueId, setProductUniqueId] = useState('');
  const [serviceUsedIn, setServiceUsedIn] = useState('');

  const [mssg, setMssg] = useState('');
  const [statusCode, setStatusCode] = useState('');

  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productList, setProductList] = useState([]);

  const [onSelect, setOnSelect] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);
  const [productValue, setProductValue] = React.useState([]);

  const [proLabel, setProLabel] = useState('');
  const [selId, setSelId] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);

  const [productMainId, setProductMainId] = useState('');
  // let showProLabelName;
  const onProductOpen = React.useCallback(() => {
    setOnSelect(false);
    getProductId();
  }, []);

  const submitProductId = async () => {

    const data = {
      product_id: productUniqueId,
      service_used_in: serviceUsedIn,
      user_id: userId,
    };

    const temp = await addProduct(data);

    if (temp.status == 200) {

      setTimeout(() => {
        navigation.navigate('Tabs');
      }, 700);

      setStatusCode(temp.status);
      setMssg(temp.data);
      getProductId();
      setProductUniqueId('');
      setServiceUsedIn('');
      setSubmitToast(true);
      setProductModal(false); 
      setTimeout(() => {
        setSubmitToast(false);
      }, 500);
    } else {     

      setSubmitToast(true);
      // getProductId();
      setProductUniqueId('');
      setServiceUsedIn('');
      setMssg(temp.message.msg);
      setTimeout(() => {
        setSubmitToast(false);
      }, 500);

    }
  };

  const getProductId = async () => {
    try {
      const data = await getProduct(userId);
      if (data.status == 200) {
        setProductDetails(data.data);
      }
      let tc = data.data.map(ele => {
        if (selId == ele.product_id) {
          setServiceUsedIn(ele.service_used_in);
          setProductMainId(ele._id);
          setProLabel(ele.service_used_in);
          setProductUniqueId(ele.product_id);
          // showProLabelName = ele.service_used_in;
        }
        if (proLabel==ele.service_used_in) {
          setProductUniqueId(ele.product_id);
        }

      });
    
      let productListFromApi = data.data.map(ele => {
        return {label: ele.service_used_in, value: ele.product_id};
        // return {label: ele.product_id, value: ele._id};
      });
      setProductList(productListFromApi);
      if (data.data.length > 0) {
        setTimeout(() => {
          navigation.navigate('Tabs');
        }, 700);
      }
      // }
    } catch (error) {
      console.log(error);
    }

    // setServiceUsedIn(tc);
  };
  const updateProductDetails = async () => {
    const body = {
      product_id: productUniqueId,
      service_used_in: serviceUsedIn,
    };

    const data = await updateProduct(body, productMainId);
    if (data.status == 200) {
      setStatusCode(data.status);
      getProductId();
      setMssg(data.data);
      setUpdateToast(true);
    }
    setTimeout(() => {
      setProductModal(false);
      setUpdateToast(false);
    }, 500);
  };

  // const fetchProductLabelValue = async () => {

  //   let projectFromApi = response.data.map(ele => {
  //     return {label: ele.project_name, value: ele._id};
  //   });
  //   setProject(projectFromApi);

  // };

  useEffect(() => {
    getProductId();
  }, []);

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
              label="Product Name"
              // label="Service Used In"
              // left={<TextInput.Icon name={() => <MaterialIcons name={'miscellaneous-services'} size={20} />} />}
              left={<TextInput.Icon icon="water-sync" />}
              onChangeText={value => {
                setServiceUsedIn(value);
              }}
              value={updateStatus ? serviceUsedIn : serviceUsedIn}
            />
            <TextInput
              mode="outlined"
              label="Product Unique Id"
              left={<TextInput.Icon icon="fingerprint" />}
              onChangeText={value => {
                setProductUniqueId(value);
              }}
              value={updateStatus ? productUniqueId : productUniqueId}
            />
            {updateStatus ? (
              <TouchableOpacity
                style={{
                  marginTop: 60,
                  backgroundColor: COLORS.blue_600,
                  borderRadius: SIZES.body4 * 0.5,
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => updateProductDetails()}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>Update</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginTop: 60,
                  backgroundColor: COLORS.blue_600,
                  borderRadius: SIZES.body4 * 0.5,
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => submitProductId()}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  }



  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.body1 * 1,
      }}>
      {productList.length > 0 ? (
        <View
          style={{
            flex: 1,
            // width: '95%',
            // alignSelf: 'center',
            ...styles.shadow,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: SIZES.body1 * 2,
              alignItems: 'center',
            }}>
            <View style={{padding: SIZES.base * 2}}>
              <DropDownPicker
                style={{
                  borderWidth: null,
                  width: '70%',
                  backgroundColor: COLORS.white,
                  minHeight: 40,
                  borderRadius: 5,
                }}
                dropDownContainerStyle={{
                  backgroundColor: COLORS.darkGray,
                  borderWidth: null,
                  width: '70%',
                  borderRadius: 5,
                }}
                textStyle={{
                  fontSize: 16,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                }}
                listParentLabelStyle={{color: COLORS.white, fontSize: 15}}
                placeholder="Select Product"
                open={openProduct}
                value={productValue}
                items={productList}
                setOpen={setOpenProduct}
                setValue={setProductValue}
                setItems={setProductList}
                tickIconStyle={{
                  width: 18,
                  height: 18,
                  backgroundColor: COLORS.white,
                  tintColor: 'black',
                }}
                onSelectItem={value => {
                  // fetchReport(value.value);
                  // setProjectId(value.value);
                  setSelId(value.value);
                  setProductUniqueId(value.value);
                  setProLabel(value.label);
                  // dispatch(removeSliceProduct({product_id:value.label,id:value.value}));
                  dispatch(
                    addSliceProduct({
                      product_id: value.value,
                      service_used_in: value.label,
                    }),
                  );
                  setOnSelect(true);
                  // fetchReportPath();
                }}
                onOpen={onProductOpen}
                autoScroll={false}
                arrowIconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: 'black',
                }}
              />
            </View>
            <View style={{padding: SIZES.base}}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  elevation: 1,
                  borderColor: COLORS.transparentBlack1,
                  padding: SIZES.base * 0.6,
                  // marginHorizontal: SIZES.body1 * 4.3,
                  // alignItems: 'center',
                  // marginBottom: productList.length > 0 ? SIZES.height * 0.3 : 0,
                }}
                onPress={() => {
                  setUpdateStatus(false);
                  setProductUniqueId('');
                  setServiceUsedIn('');
                  setProductModal(true);
                }}>
                <Text
                  style={{
                    ...FONTS.body4,
                  }}>
                  Add New Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{marginLeft: SIZES.body1 * 0.7, marginTop: SIZES.body1 * 2}}>
            <Text
              style={{...FONTS.body2, textAlign: 'left', color: COLORS.black}}>
              Product List
            </Text>
          </View>

          { 
            <>           
              <View
            style={{
              width: '90%',
              padding: SIZES.body2,
              margin: SIZES.body1,
              elevation: 1,
              // marginTop: SIZES.body1 * 3,
              borderWidth: 1,
              borderRadius: SIZES.base * 0.5,
              alignSelf: 'center',
              borderLeftWidth: 5,
              borderColor: COLORS.cyan_500,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{...FONTS.body3}}>Product Name : {proLabel}</Text>
              <TouchableOpacity
                onPress={() => {
                  setProductUniqueId(selId);
                  getProductId();
                  // setServiceUsedIn(serviceUsedIn);
                  setUpdateStatus(true);
                  setProductModal(true);
                }}>
                <AntDesign name={'edit'} color={COLORS.darkGray} size={25} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
            </>
          }
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              // alignSelf:'center',
              // alignContent: 'space-between',
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
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: COLORS.transparentBlack2,
                marginTop: SIZES.body1,
                padding: SIZES.base * 0.2,
                marginHorizontal: SIZES.body1 * 4.3,
                alignItems: 'center',
                // elevation:1
                // marginBottom:  0,
              }}
              onPress={() => {
                setUpdateStatus(false);
                setProductUniqueId('');
                setServiceUsedIn('');
                setProductModal(true);
              }}>
              <Text
                style={{
                  ...FONTS.body4,
                }}>
                Add New Product
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {renderAddProductModal()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={statusCode == 200 ? COLORS.green : COLORS.red}
        title={statusCode == 200 ? 'Registeration' : 'Something Went Wrong'}
        message={mssg}
      />
      <CustomToast
        isVisible={updateToast}
        onClose={() => setUpdateToast(false)}
        color={statusCode == 200 ? COLORS.amber_300 : COLORS.red}
        title={statusCode == 200 ? 'Product Details!' : 'Something Went Wrong'}
        message={mssg}
      />
    </View>
  );
};
export default Products;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
