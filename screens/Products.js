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
  TouchableWithoutFeedback,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {FONTS, COLORS, icons, SIZES} from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput, Divider} from 'react-native-paper';
import {getData, storeData, getObjectData} from '../utils/localStorage';
import {CustomToast} from '../componets';
import {
  addProduct,
  getProduct,
  updateProduct,
  makeProductPrimary,
} from '../controllers/productController';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {addSliceProduct} from '../redux/productSlice';
import {addIntervalMode} from '../redux/intervalSlice';
import {useSelector} from 'react-redux';

const Products = ({navigation}) => {
  const dispatch = useDispatch();
  const creds = useSelector(state => state.userCreds);
  const interval = useSelector(state => state.intervalMode);
  const [userId, setUserId] = useState('');
  // let userId;
  let lg_tkn;
  let us_cred;

  const credFunc = async () => {
    try {
      lg_tkn = await getData('login_token');
      us_cred = await getObjectData('user_credentials');
      
  
      if (Object.keys(creds).length === 0) {
        // userId = us_cred._id;
        return us_cred._id;
        // return setUserId(us_cred._id);
      } else {
        // userId = creds.user_credentials._id;
        return creds.user_credentials._id;
        // return setUserId(creds.user_credentials._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const [updateStatus, setUpdateStatus] = useState(false);
  const [productPopupMenu, setProductPopupMenu] = useState(false);
  const [productMainId, setProductMainId] = useState('');

  const [updatePrimaryLabel, setUpdatePrimaryLabel] = useState('');
  const [updatePrimaryId, setUpdatePrimaryId] = useState('');

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
      storeData('primary_product', temp.product_id);
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
      const temp = await credFunc();

      setUserId(temp);

      const data = await getProduct(temp);

      if (data.status == 200) {
        setProductDetails(data.data);
      }
      const temp_product_id = await getData('primary_product');
      const temp_product_name = await getData('primary_product_name');
      dispatch(
        addSliceProduct({
          product_id: temp_product_id,
          service_used_in: temp_product_name,
        }),
      );
      setProductValue(temp_product_id);
      setProductUniqueId(temp_product_id);
      setUpdatePrimaryId(temp_product_id);

      // let tc = data.data.map(ele => {
      //   if (selId == ele.product_id) {
      //     setServiceUsedIn(ele.service_used_in);
      //     setProductMainId(ele._id);
      //     setProLabel(ele.service_used_in);
      //     setProductUniqueId(ele.product_id);
      //     // showProLabelName = ele.service_used_in;
      //   }
      //   if (proLabel == ele.service_used_in) {
      //     setProductUniqueId(ele.product_id);
      //   }
      // });

      let productListFromApi = data.data.map(ele => {
        // return {
        //   label:
        //     updatePrimaryLabel == ele.service_used_in
        //       ? updatePrimaryLabel
        //       : ele.service_used_in,
        //   value:
        //     updatePrimaryId == ele.product_id
        //       ? updatePrimaryId
        //       : ele.product_id,
        // };

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
      setProductValue(data.product_id);
      getProductId();
      setMssg(data.data);
      setUpdateToast(true);
    }
    setTimeout(() => {
      setProductModal(false);
      setUpdateToast(false);
    }, 500);
  };
  const updatePrimaryStatus = async id => {
    const data = await makeProductPrimary(id);
    // console.log("🚀 ~ file: Products.js:179 ~ updatePrimaryStatus ~ data", data)
    if (data.status == 200) {
      // setStatusCode(data.status);
      setProductValue(data.product_id);
      storeData('primary_product', data.product_id);
      storeData('primary_product_name', data.label);
      // getProductId();
      setUpdatePrimaryLabel(data.label);
      // setUpdatePrimaryId(true);
      // setUpdatePrimaryId(data.product_id);
      dispatch(
        addSliceProduct({
          product_id: data.product_id,
          service_used_in: data.label,
        }),
      );
      // setProductValue(data.label);
      // setMssg(data.data);
      // setUpdateToast(true);
    }

    // setTimeout(() => {
    //   // setProductModal(false);
    //   setUpdateToast(false);
    // }, 500);
  };
  // const fetchProductLabelValue = async () => {

  //   let projectFromApi = response.data.map(ele => {
  //     return {label: ele.project_name, value: ele._id};
  //   });
  //   setProject(projectFromApi);

  // };

  const renderPopup = () => (
    <Modal animationType="none" transparent={true} visible={productPopupMenu}>
      <TouchableWithoutFeedback onPress={() => setProductPopupMenu(false)}>
        <View
          style={{
            // flex: 1,
            alignSelf: 'center',
            marginTop: SIZES.height * 0.21,
            padding: SIZES.body1 * 0.5,
            height: '20%',
            width: '50%',
            backgroundColor: COLORS.white3,
            borderRadius: SIZES.base,
            // marginHorizontal: SIZES.body1 * 4.6,
            justifyContent: 'space-evenly',
            // margin: 50,
            // left: SIZES.width * 0.42,
            // top: SIZES.height * 0.15,
            marginBottom: SIZES.height,
          }}>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.body1,
              alignItems: 'center',
              // padding: SIZES.base * 0.1,

              // borderBottomWidth: 1,
              borderColor: COLORS.lightGray1,
            }}
            // onPress={() => updatePrimaryStatus()}
          >
            <Fontisto name="radio-btn-active" size={10} color={COLORS.gray} />
            <Text style={{...FONTS.body3, flex: 0.7, textAlign: 'center'}}>
              Primary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.body1,
              alignItems: 'center',
              // borderBottomWidth: 1,
              borderColor: COLORS.lightGray1,
            }}
            onPress={() => {
              setProductModal(true);
              setUpdateStatus(true);
              getProductId();
            }}>
            <Fontisto name="radio-btn-active" size={10} color={COLORS.gray} />
            <Text style={{...FONTS.body3, flex: 0.9, textAlign: 'center'}}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              padding: SIZES.base * 0.2,
              borderRadius: SIZES.base * 0.5,
              borderColor: COLORS.lightGray1,
            }}
            onPress={() => {
              setProductPopupMenu(false);
            }}>
            <Text style={{textAlign: 'center'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const renderItem = ({item}) => (
    <View
      style={{
        // alignItems:'center',
        // marginHorizontal: SIZES.body1*0.5 ,
        marginRight: SIZES.body1 * 7,
        marginLeft: SIZES.base,
        padding: SIZES.base * 0.5,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.base,
          alignItems: 'center',
          padding: SIZES.body5 * 0.5,
          // elevation: 1,
          borderWidth: updatePrimaryId == item.product_id ? 2 : 0,
          borderColor:
            updatePrimaryId == item.product_id
              ? COLORS.cyan_500
              : COLORS.blue_50,
          borderRadius: SIZES.base * 0.5,
          borderRightWidth: 0,
          borderLeftWidth: updatePrimaryId == item.product_id ? 5 : 0,
        }}
        onPress={() => {
          setServiceUsedIn(item.service_used_in);
          setProductUniqueId(item.product_id);
          setUpdatePrimaryId(item.product_id);
          updatePrimaryStatus(item._id);
          setTimeout(() => {
            dispatch(
              addIntervalMode({
                intervalMode: true,
              }),
            );
            navigation.navigate('Home');
          }, 700);
        }}>
        <TouchableOpacity
          onPress={() => {
            setServiceUsedIn(item.service_used_in);
            setProductUniqueId(item.product_id);
            setUpdatePrimaryId(item.product_id);
            updatePrimaryStatus(item._id);
            setTimeout(() => {
              dispatch(
                addIntervalMode({
                  intervalMode: true,
                }),
              );
              navigation.navigate('Home');
            }, 700);
          }}>
          <View style={{}}>
            <Text style={{...FONTS.body3}}>{item.service_used_in}</Text>
          </View>
        </TouchableOpacity>
        <Entypo
          name="check"
          style={{}}
          size={22}
          color={
            updatePrimaryId == item.product_id ? COLORS.green : COLORS.white
          }
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    dispatch(
      addIntervalMode({
        intervalMode: false,
      }),
    );
    getProductId();
    credFunc();
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
                  // backgroundColor: COLORS.blue_600,
                  backgroundColor: COLORS.cyan_600,
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
        <View>
          {/* <View style={{alignSelf: 'center'}}>
            <DropDownPicker
              style={{
                borderWidth: null,
                width: '95%',
                alignSelf: 'center',
                // width: '100%',
                backgroundColor: COLORS.white,
                minHeight: 40,
                borderRadius: 5,
              }}
              dropDownContainerStyle={{
                backgroundColor: COLORS.darkGray,
                borderWidth: null,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 5,
              }}
              defaultValue={productValue}
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
                // setSelId(value.value);
                setProductUniqueId(value.value);
                // setProLabel(value.label);
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
          </View> */}
          <View
            style={{
              marginTop: SIZES.body2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.body2,
            }}>
            <Text
              style={{
                ...FONTS.body2,
                textAlign: 'left',
                color: COLORS.darkGray,
              }}>
              Product List
            </Text>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                elevation: 1,
                borderColor: COLORS.transparent,
                backgroundColor: COLORS.cyan_600,
                padding: SIZES.base * 0.6,
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
                  color: COLORS.white,
                }}>
                Add New Product
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: SIZES.body1 * 2}}>
            <View
              style={{
                // backgroundColor: COLORS.white,
                // marginHorizontal: SIZES.body3,
                // paddingVertical: SIZES.base,
                // elevation: 15,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,

                  color: COLORS.darkGray,
                  textAlign: 'center',
                }}>
                Show as Dashboard
              </Text>
            </View>
            <FlatList
              data={productDetails}
              style={{marginTop: SIZES.body1}}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              width: '80%',
              height: '40%',
              alignItems: 'center',
              // backgroundColor:'red' ,
              alignSelf: 'center',
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
                marginTop: SIZES.body1,
                padding: SIZES.base * 0.6,
                paddingHorizontal: SIZES.body2,
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: COLORS.cyan_600,
                elevation: 2,
                borderRadius: SIZES.base * 0.5,
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
                  color: COLORS.white,
                }}>
                Add New Product
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* {renderPopup()} */}
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
