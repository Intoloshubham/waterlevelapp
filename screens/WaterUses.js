import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES, constant} from '../constants';
import {TextInput, Divider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomToast, CustomConfirmationToast} from '../componets';
import {getData, storeData} from '../utils/localStorage';
import {
  feedWaterUse,
  getWaterUse,
  getWaterUsageDetail,
  totalUsage,
} from '../controllers/WaterUsesController';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WaterUses = ({navigation}) => {
  let temp_storeRegistId;

  const [usesDetail, setUsesDetail] = useState(false);
  const [noOfUser, setNoOfUser] = useState('');

  const [diameter, setDiameter] = useState('');
  const [langth, setLangth] = useState('');
  const [breadth, setBreadth] = useState('');

  const [confirmToast, setConfirmToast] = useState(false);

  const [cylinderShape, setCylinderShape] = useState(false);
  const [cuboidalShape, setCuboidalShape] = useState(false);

  const [shape, setShape] = useState('');

  const [tankHeight, setTankHeight] = useState(100);

  const [uniqueId, setUniqueId] = useState('');
  const [unit, setUnit] = useState('CM');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [waterUseData, setWaterUseData] = useState([]);
  const [WaterUsageDetails, setWaterUsageDetails] = useState([]);
  const [totalUsageData, setTotalUsageData] = useState(0);
  //toast
  const [submitToast, setSubmitToast] = React.useState(false);
  const [mssg, setMssg] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [respTitle, setRespTitle] = useState('');

  const [items, setItems] = useState([
    {label: 'CM', value: '0'},
    {label: 'Meter', value: '1'},
  ]);

  const credFunc = async () => {
    try {
      const tk = await getData('tank_height');
      setTankHeight(tk);
      temp_storeRegistId = await getData('primary_product');
      return temp_storeRegistId;
    } catch (error) {
      console.log(error);
    }
  };

  const setTankDefaultHeight = async () => {
    let temp=100;
    const tk=await storeData('tank_height',temp.toString());
    setTankHeight(100);
    setConfirmToast(false);
  };

  const feedUsesData = async () => {
    try {
      const tc = await credFunc();
      setUniqueId(tc);
      if (noOfUser == '' || shape == '' || unit == '') {
        alert('Fill all required fields');
      } else if (
        (shape == constant.CYLINDRICAL && diameter == '') ||
        (shape == constant.CUBOIDAL && (langth == '' || breadth == ''))
      ) {
        if (shape == constant.CYLINDRICAL && diameter == '')
          alert('diameter field required');
        else alert('Length & Breadth is required');
      } else {     
        console.log('tankHeight-12--',tankHeight)
        if ((tankHeight === undefined )|| (tankHeight === '0')) {
          setConfirmToast(true);
        } else {
          const inputs = {
            unique_id: tc,
            no_of_users: noOfUser,
            tank_shape: shape,
            tank_diameter: diameter,
            unit: unit == 'CM' ? 0 : 1,
            tank_length: langth,
            tank_breadth: breadth,
            tank_height: tankHeight,
          };
          const temp = await feedWaterUse(inputs);

          if (temp.status == 200) {
            getWaterUsage();
            usageDetails();
            setStatusCode(temp.status);
            setMssg(temp.msg);
            setRespTitle('Water Usage Details');
            setSubmitToast(true);
            setTimeout(() => {
              setSubmitToast(false);
              setUsesDetail(false);
            }, 1500);

            setLangth('');
            setBreadth('');
            setTankHeight('');
            setUnit(' ');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWaterUsage = async () => {
    try {
      const temp = await getWaterUse();
      if (temp.data.length > 0) {
        setWaterUseData(temp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const usageDetails = async () => {
    try {
      const temp = await getWaterUsageDetail();
      if (temp.data != null) {
        setWaterUsageDetails(temp.data);
        // setWaterUsageDetails(temp.data.waterUsage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalUsage = async () => {
    try {
      const tc = await credFunc();
      const temp = await totalUsage(tc);
      setTotalUsageData(temp.total_usage);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTotalUsage();
    getWaterUsage();
    usageDetails();
  }, []);

  function renderUsesDetailsModel() {
    return (
      <Modal animationType="fade" transparent={true} visible={usesDetail}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          extraScrollHeight={21}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                marginTop: SIZES.height * 0.4,
                height: '100%',
                width: '100%',
                borderTopEndRadius: SIZES.base,
                borderTopStartRadius: SIZES.base,
                backgroundColor: COLORS.white2,
                paddingHorizontal: SIZES.body5,
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  setUsesDetail(false);
                }}>
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    tintColor: COLORS.cyan_500,
                  }}
                  source={icons.cross}
                />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'space-evenly',
                }}>
                <TextInput
                  mode="outlined"
                  placeholder="No. of Users"
                  style={{
                    backgroundColor: COLORS.white2,
                    placeholderTextColor: COLORS.gray,
                  }}
                  outlineColor={COLORS.cyan_600}
                  activeOutlineColor={COLORS.cyan_600}
                  placeholderTextColor={COLORS.darkGray}
                  // left={<TextInput.Icon icon="account-supervisor" />}
                  onChangeText={value => {
                    setNoOfUser(value);
                  }}
                  value={noOfUser}
                />
              </View>
              <View
                style={{
                  marginTop: SIZES.base,
                  padding: SIZES.base,
                  borderWidth: 1,
                  borderRadius: SIZES.base * 0.5,
                  borderColor: COLORS.cyan_600,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '34%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* <FontAwesome5
                    name="shapes"
                    color={COLORS.darkGray}
                    size={18}
                  /> */}
                  <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                    Tank Shape
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '55%',
                    marginLeft: SIZES.body1 * 0.7,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: SIZES.body5 * 0.5,
                      backgroundColor: cylinderShape
                        ? COLORS.cyan_600
                        : COLORS.transparentBlack2,
                      width: '50%',
                      elevation: 0.2,
                    }}
                    onPress={() => {
                      setCylinderShape(true);
                      setShape(constant.CYLINDRICAL);
                      setCuboidalShape(false);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: cylinderShape ? COLORS.white : COLORS.gray,
                      }}>
                      Cylindrical
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: SIZES.body5 * 0.5,
                      backgroundColor: cuboidalShape
                        ? COLORS.cyan_600
                        : COLORS.transparentBlack2,

                      width: '50%',
                      left: SIZES.base * 0.5,
                      elevation: 1,
                    }}
                    onPress={() => {
                      setCuboidalShape(true);
                      setShape(constant.CUBOIDAL);
                      setCylinderShape(false);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: cuboidalShape ? COLORS.white : COLORS.gray,
                      }}>
                      Cuboidal
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  marginTop: SIZES.base,
                }}>
                <DropDownPicker
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: SIZES.base * 0.5,
                    borderColor: COLORS.cyan_600,
                    padding: SIZES.base,
                    color: COLORS.gray,
                  }}
                  containerStyle={{
                    color: COLORS.gray,
                    zIndex: 1000,
                  }}
                  selectedItemContainerStyle={{
                    color: COLORS.gray,
                  }}
                  dropDownContainerStyle={{
                    borderWidth: null,
                    borderRadius: null,
                    backgroundColor: COLORS.lightGray2,
                    alignSelf: 'center',
                    margin: 5,
                    color: COLORS.gray,
                  }}
                  placeholderStyle={{
                    color: 'grey',
                    fontWeight: 'bold',
                  }}
                  placeholder="Unit"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                  onSelectItem={value => {
                    setUnit(value.label);
                  }}
                  onChangeValue={val => {
                    if (val == 0) {
                      setUnit('CM');
                    } else {
                      setUnit('Meter');
                    }
                  }}
                />
              </View>

              {cylinderShape && cuboidalShape == false ? (
                <TextInput
                  mode="outlined"
                  // label="Diameter"
                  placeholder="Diameter"
                  style={{
                    backgroundColor: COLORS.white2,
                    // placeholderTextColor: COLORS.gray,
                  }}
                  outlineColor={COLORS.cyan_600}
                  activeOutlineColor={COLORS.cyan_500}
                  placeholderTextColor={COLORS.darkGray}
                  // left={<TextInput.Icon icon="diameter" />}
                  onChangeText={value => {
                    setDiameter(value);
                  }}
                  value={diameter}
                />
              ) : cuboidalShape == true ? (
                <View>
                  <TextInput
                    mode="outlined"
                    // label="Length"
                    placeholder="Length"
                    style={{
                      backgroundColor: COLORS.white2,
                      // placeholderTextColor: COLORS.gray,
                    }}
                    outlineColor={COLORS.cyan_600}
                    activeOutlineColor={COLORS.cyan_600}
                    placeholderTextColor={COLORS.darkGray}
                    // left={<TextInput.Icon icon="diameter" />}
                    onChangeText={value => {
                      setLangth(value);
                    }}
                    value={langth}
                  />
                  <TextInput
                    mode="outlined"
                    // label="Breadth"
                    placeholder="Breadth"
                    style={{
                      backgroundColor: COLORS.white2,
                      // placeholderTextColor: COLORS.gray,
                    }}
                    outlineColor={COLORS.cyan_600}
                    activeOutlineColor={COLORS.cyan_500}
                    placeholderTextColor={COLORS.darkGray}
                    // left={<TextInput.Icon icon="diameter" />}
                    onChangeText={value => {
                      setBreadth(value);
                    }}
                    value={breadth}
                  />
                </View>
              ) : (
                false
              )}
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  alignItems: 'center',
                  marginTop: SIZES.body1,
                  padding: SIZES.base,
                  marginHorizontal: SIZES.body1 * 3,
                  borderRadius: SIZES.base * 0.5,
                  elevation: 1,
                  backgroundColor: COLORS.cyan_600,
                  borderColor: COLORS.white,
                }}
                onPress={() => {
                  feedUsesData();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    ...FONTS.body4,
                    color: COLORS.white,
                  }}>
                  Feed Data
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }

  function usesDashboard() {
    return (
      <View style={{}}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: COLORS.cyan_600,
            borderRadius: SIZES.base * 0.5,
            elevation: 2,
            alignSelf: 'flex-start',
            marginLeft: SIZES.body5 * 0.6,
            padding: SIZES.base * 0.5,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              width: '25%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: COLORS.cyan_700,
            }}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white2} />
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
              }}>
              Back
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.cyan_600,
            borderRadius: SIZES.base * 0.5,
            elevation: 2,
            marginHorizontal: SIZES.base,
            padding: SIZES.base,
            marginTop: SIZES.base,
          }}
          onPress={() => {
            setUsesDetail(true);
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              textAlign: 'center',
            }}>
            Feed Water Use Data
          </Text>
        </TouchableOpacity>

        {/* <View
          style={{
            height: '25%',
            width: '95%',
            borderRadius: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.base,
            elevation: 1,
            marginTop: SIZES.base,
            backgroundColor: COLORS.white,
          }}></View> */}
      </View>
    );
  }

  function renderUsageDetail() {
    return (
      <View>
        {waterUseData.map(ele => {
          return (
            <View
              key={ele._id}
              style={{
                backgroundColor: COLORS.white2,
                // backgroundColor: COLORS.cyan_400,
                margin: SIZES.base,
                // padding: SIZES.base,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                borderRadius: SIZES.base,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // margin: 5,
                  backgroundColor: COLORS.cyan_600,
                  paddingHorizontal: SIZES.width * 0.3,
                  paddingVertical: SIZES.base * 0.9,
                  borderTopEndRadius: SIZES.base,
                  borderTopStartRadius: SIZES.base,
                  justifyContent: 'center',
                  // alignSelf:'center'
                  // borderRadius: 5,
                  // borderWidth: 1,
                  // borderColor: COLORS.transparentBlack1,
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    // textAlign:'center',
                    color: COLORS.white2,
                  }}>
                  {ele.tank_shape.toUpperCase()}
                </Text>
              </View>
              {/* <Divider
                style={{
                  backgroundColor: COLORS.lightGray1,
                  padding: 0.4,
                  width: SIZES.width * 0.92,
                  alignSelf: 'center',
                  height: SIZES.height * 0.001,
                }}
              /> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor: COLORS.w,
                  // borderRadius: 2,
                  // borderWidth: 1,
                  // borderColor: COLORS.transparentBlack1,
                  paddingHorizontal: SIZES.base * 2,
                  marginVertical: SIZES.base * 0.5,
                  paddingVertical: SIZES.base * 0.9,
                }}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Tank Unit
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {ele.unit == '0' ? 'CM' : 'M'}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Total Users
                  </Text>
                  <Text
                    style={{
                      // flex: 0.46,
                      textAlign: 'center',
                      ...FONTS.body3,
                      // backgroundColor:'red',
                      color: COLORS.gray,
                    }}>
                    {ele.no_of_users}
                  </Text>
                </View>
                { ele.tank_shape==constant.CYLINDRICAL? <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Diameter
                  </Text>
                  <Text
                    style={{
                      // flex: 0.5,
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {ele.radius + ele.radius}
                  </Text>
                </View>:
                <>
                <View>
                 <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                     Length
                  </Text>
                  <Text
                    style={{
                      // flex: 0.5,
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {ele.tank_length }
                  </Text>
                </View>
                <View>
                 <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Breadth
                  </Text>
                  <Text
                    style={{
                      // flex: 0.5,
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {ele.tank_breadth }
                  </Text>
                </View>
                </>
                
                }
                   <View>
                 <Text
                    style={{
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Height
                  </Text>
                  <Text
                    style={{
                      // flex: 0.5,
                      textAlign: 'center',
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {ele.tank_height }
                  </Text>
                </View>
              </View>
              {/* <Divider
                style={{
                  backgroundColor: COLORS.lightGray1,
                  padding: 0.4,
                  width: SIZES.width * 0.92,
                  alignSelf: 'center',
                  height: SIZES.height * 0.001,
                }}
              /> */}
              <View
                style={{
                  // marginVertical: SIZES.base * 0.5,
                  // alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingHorizontal: SIZES.width * 0.01,
                  padding: SIZES.base,
                  backgroundColor: COLORS.cyan_600,
                  justifyContent: 'space-between',
                  // borderRadius: 2,
                  // borderWidth: 1,
                  borderBottomEndRadius: SIZES.base,
                  borderBottomStartRadius: SIZES.base,
                  borderColor: COLORS.transparentBlack1,
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white2,
                  }}>
                  Tank Capacity :
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    ...FONTS.body3,
                    color: COLORS.white2,
                  }}>
                  {parseFloat(ele.volume).toFixed(2)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  const ListHeader = () => {
    return (
      <View style={{flexDirection: 'row', elevation: 1}}>
        <View
          style={{
            width: 120,
            margin: 2,
            backgroundColor: COLORS.transparentBlack1,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.darkGray,
              textAlign: 'center',
            }}>
            Present Date
          </Text>
        </View>
        <View
          style={{
            width: 100,
            margin: 2,
            backgroundColor: COLORS.transparentBlack1,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.darkGray,
              textAlign: 'center',
            }}>
            Time
          </Text>
        </View>
        <View
          style={{
            width: 90,
            margin: 2,
            backgroundColor: COLORS.transparentBlack1,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.darkGray,
              textAlign: 'center',
            }}>
            Usage level
          </Text>
        </View>
        {/* <View style={{width: 120, backgroundColor: 'white'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: COLORS.darkGray,
                textAlign: 'center',
              }}>
              Radius
            </Text>
          </View>
          <View style={{width: 200, backgroundColor: 'white'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: COLORS.darkGray,
                textAlign: 'center',
              }}>
              Volume
            </Text>
          </View> */}
      </View>
    );
  };

  const renderItem = ({item}) =>
    item.waterUsage.map((ele, idx) => (
      <View
        key={idx}
        style={{
          flexDirection: 'row',
          margin: 1,
          borderWidth: 0.05,
          marginTop: SIZES.base,
          marginVertical: SIZES.base * 0.5,
        }}>
        <View style={{width: 120}}>
          <Text style={{fontSize: 16, color: COLORS.gray, textAlign: 'center'}}>
            {ele.present_date}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray1,
            padding: 0.4,
            height: SIZES.height * 0.04,
          }}
        />
        <View style={{width: 100}}>
          <Text style={{fontSize: 16, color: COLORS.gray, textAlign: 'center'}}>
            {ele.in_time}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray1,
            padding: 0.4,
            height: SIZES.height * 0.04,
          }}
        />
        <View style={{width: 90}}>
          <Text style={{fontSize: 16, color: COLORS.gray, textAlign: 'center'}}>
            {ele.level}
          </Text>
        </View>

        {/* <Divider
          style={{
            backgroundColor: COLORS.lightGray1,
            padding: 0.4,
            height: SIZES.height * 0.04,
          }}
        /> */}
        {/* <Divider
          style={{
            backgroundColor: COLORS.lightGray1,
            padding: 0.4,
            height: SIZES.height * 0.04,
          }}
        /> */}
      </View>
    ));

  return (
    <View style={{}}>
      <View style={{marginTop: 10}}>{usesDashboard()}</View>
      {renderUsesDetailsModel()}
      {renderUsageDetail()}
      {WaterUsageDetails.length > 0 ? (
        <View
          style={{
            borderWidth: 1,
            elevation: 2,
            borderColor: COLORS.transparent,
            borderRadius: SIZES.base * 0.5,
            backgroundColor: COLORS.white2,
            padding: SIZES.base,
            marginHorizontal: SIZES.base,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            borderTopStartRadius: SIZES.base,
            borderTopEndRadius: SIZES.base,
          }}>
          <View
            style={{
              marginVertical: SIZES.base * 0.5,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.darkGray,
                fontWeight: '600',
              }}>
              WATER USAGE DATA
            </Text>
          </View>
          {/* {WaterUsageDetails.length > 0 ?  */}
          <FlatList
            data={WaterUsageDetails}
            renderItem={item => renderItem(item)}
            contentContainerStyle={{
              paddingHorizontal: SIZES.base,
            }}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={ListHeader}
            ItemSeparatorComponent={
              <View
                style={{
                  height: 1,
                  width: '86%',
                  backgroundColor: '#CED0CE',
                  marginLeft: '14%',
                }}
              />
            }
          />

          <View
            style={{
              marginVertical: SIZES.base * 0.5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.base * 0.4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.darkGray,
                fontWeight: '600',
              }}>
              Total Water Usage :
            </Text>
            <Text>{totalUsageData}</Text>
          </View>
        </View>
      ) : (
        ''
      )}

      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={statusCode == 200 ? COLORS.green : COLORS.red}
        title={statusCode == 200 ? respTitle : 'Something Went Wrong'}
        message={mssg}
      />
      <CustomConfirmationToast
        isVisible={confirmToast}
        onClose={() => setConfirmToast(false)}
        color={COLORS.rose_600}
        title={'Are You Sure?'}
        message={'Do you want to set height default ?'}
        onClickYes={() => {
          setTankDefaultHeight();
        }}
        icon={icons.rectangular}
      />
    </View>
  );
};

export default WaterUses;
