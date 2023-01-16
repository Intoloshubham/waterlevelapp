import React from 'react';
import {Text, View, RefreshControl, ScrollView, Image} from 'react-native';
import {COLORS, icons} from '../constants';
import {getWaterLevelSettings} from '../controllers/SettingsController';
import {getObjectData, getData} from '../utils/localStorage.js';

const Notification = ({title, message, icon}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.cyan_300,
        elevation: 10,
        padding: 12,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View
        style={{
          borderRadius: 50,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.cyan_700,
          elevation: 5,
        }}>
        <Image
          source={icon}
          style={{height: 30, width: 30, tintColor: COLORS.white}}
        />
      </View>
      <View style={{marginHorizontal: 6}}></View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.black}}>
          {title}
        </Text>
        <Text style={{fontSize: 14, color: COLORS.darkGray}}>{message}</Text>
      </View>
    </View>
  );
};

const ShowNotification = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getNotificationSettings();
    }, 2000);
  }, []);

  
  let unique_id;

  const credFunc = async () => {
    try {
      const temp_product_id = await getData('primary_product');
      unique_id = temp_product_id;
      let us_cred = await getObjectData('user_credentials');
      return us_cred._id;
    } catch (error) {
      console.log(error);
    }
  };

  const [uses, setUses] = React.useState(false);
  const [leakage, setLeakage] = React.useState(false);
  const [quality, setQuality] = React.useState(false);
  const [needCleaning, setNeedCleaning] = React.useState(false);

  const getNotificationSettings = async () => {
    await credFunc();
    const res = await getWaterLevelSettings(unique_id);
    if (res.status === 200) {
      setUses(res.data.uses_notification);
      setLeakage(res.data.leakage_notification);
      setQuality(res.data.quality_notification);
      setNeedCleaning(res.data.need_cleaning_notification);
    }
  };

  React.useEffect(() => {
    getNotificationSettings();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{margin: 10}}>
      {uses && (
        <Notification
          title={'Uses'}
          message={'Over use of water is found please save water'}
          icon={icons.w_uses}
        />
      )}
      {leakage && (
        <Notification
          title={'Leakage'}
          message={'There is no leakage found in the water distribution system'}
          icon={icons.w_leakage}
        />
      )}
      {quality && (
        <Notification
          title={'Quality'}
          message={'Water is safe within an acceptable PH range'}
          icon={icons.w_quality}
        />
      )}
      {needCleaning && (
        <Notification
          title={'Need Cleaning'}
          message={"Doesn't need to clean the water tank"}
          icon={icons.w_tank_clean}
        />
      )}
    </ScrollView>
  );
};

export default ShowNotification;
