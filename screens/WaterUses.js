import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {TextInput, Divider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { getData } from '../utils/localStorage';
// import {} from 

const WaterUses = () => {
  const [usesDetail, setUsesDetail] = useState(false);
  const [noOfUser, setNoOfUser] = useState('');
  const [diameter, setDiameter] = useState('');
  const [langth, setLangth] = useState('');
  const [breadth, setBreadth] = useState('');
  const [cylinderShape, setCylinderShape] = useState(false);
  const [cuboidalShape, setCuboidalShape] = useState(false);
  const [uniqueId, setUniqueId] = useState('')
  const [unit, setUnit] = useState('CM');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'CM', value: '0'},
    {label: 'Meter', value: '1'},
  ]);

  const credFunc = async () => {
    try {

      temp_storeRegistId = await getData('primary_product');
      return temp_storeRegistId;

    } catch (error) {
      console.log(error);
    }
  };

 const feedUsesData = async ()=>{
  try {
    const tc=await credFunc();
    setUniqueId(tc);
    const temp=await saveWaterUses();
  } catch (error) {
    console.log(error)
  }
 }

  function renderUsesDetailsModel() {
    return (
      <Modal animationType="fade" transparent={true} visible={usesDetail}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
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
                    placeholderTextColor: COLORS.gray
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
                onPress={()=>{
                  FeedUsesData()
                }}
                >
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
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.cyan_600,
            borderRadius: SIZES.base,
            elevation: 2,
            paddingHorizontal: SIZES.body1 * 3,
            paddingVertical: SIZES.base,
          }}
          onPress={() => {
            setUsesDetail(true);
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              // textAlign: 'center',
            }}>
            Add Water Uses
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

  return (
    <View style={{}}>
      <View style={{marginTop:10}}>{usesDashboard()}</View>
      {renderUsesDetailsModel()}
    </View>
  );
};

export default WaterUses;
