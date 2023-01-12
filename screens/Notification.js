import React from 'react';
import {Text, View} from 'react-native';
import {FONTS, COLORS} from '../constants';
import CheckBox from '@react-native-community/checkbox';
import {postNotificationStatus} from '../controllers/NotificationController';
import {useSelector} from 'react-redux';
import {getWaterLevelSettings} from '../controllers/SettingsController';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  // onNotification: function (notification) {
  //   console.log('NOTIFICATION:', notification);
  //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  // },

  // onAction: function (notification) {
  //   console.log('ACTION:', notification.action);
  //   console.log('NOTIFICATION:', notification);
  // },

  // onRegistrationError: function (err) {
  //   console.error(err.message, err);
  // },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const Notification = () => {
  const user = useSelector(state => state.userCreds);
  const user_id = user.user_credentials._id;

  const [uses, setUses] = React.useState(false);
  const [leakage, setLeakage] = React.useState(false);
  const [quality, setQuality] = React.useState(false);
  const [needCleaning, setNeedCleaning] = React.useState(false);

  const postNotificationSettings = async (type, status) => {
    const formData = {notification_type: type, status: status};
    await postNotificationStatus(formData, user_id);
  };

  const getNotificationSettings = async () => {
    const res = await getWaterLevelSettings(user_id);
    // console.log(res);
    if (res.status === 200) {
      setUses(res.data.uses_notification);
      setLeakage(res.data.leakage_notification);
      setQuality(res.data.quality_notification);
      setNeedCleaning(res.data.need_cleaning_notification);

      if (res.data.uses_notification) {
        pushNotification('Uses', 'body');
      }
      if (res.data.leakage_notification) {
        pushNotification('Leakage', 'body');
      }
      if (res.data.quality_notification) {
        pushNotification('Quality', 'body');
      }
      if (res.data.need_cleaning_notification) {
        pushNotification('Need cleaning', 'body');
      }
    }
  };

  React.useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: '1',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.DEFAULT,
        vibrate: true,
      },
    //   created => console.log(`createChannel returned '${created}'`),
    );
    getNotificationSettings();
  }, []);

  const pushNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: '1',
      title: `${title}`,
      message: `${message}`,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.cyan_600,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginTop: 10,
        borderRadius: 10,
        elevation: 5,
      }}>
      <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
        Notification Turn On / Off
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{backgroundColor: COLORS.white, borderRadius: 50}}>
          <CheckBox
            value={uses}
            onValueChange={value => {
              setUses(value);
              postNotificationSettings('Uses', value);
            }}
          />
        </View>
        <Text
          selectable
          style={{
            left: 10,
            ...FONTS.h4,
            color: COLORS.white,
            textTransform: 'capitalize',
          }}>
          Uses
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{backgroundColor: COLORS.white, borderRadius: 50}}>
          <CheckBox
            value={leakage}
            onValueChange={value => {
              setLeakage(value);
              postNotificationSettings('Leakage', value);
            }}
          />
        </View>
        <Text
          selectable
          style={{
            left: 10,
            ...FONTS.h4,
            color: COLORS.white,
            textTransform: 'capitalize',
          }}>
          Leakage
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{backgroundColor: COLORS.white, borderRadius: 50}}>
          <CheckBox
            value={quality}
            onValueChange={value => {
              setQuality(value);
              postNotificationSettings('Quality', value);
            }}
          />
        </View>
        <Text
          selectable
          style={{
            left: 10,
            ...FONTS.h4,
            color: COLORS.white,
            textTransform: 'capitalize',
          }}>
          Quality
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{backgroundColor: COLORS.white, borderRadius: 50}}>
          <CheckBox
            value={needCleaning}
            onValueChange={value => {
              setNeedCleaning(value);
              postNotificationSettings('NeedCleaning', value);
            }}
          />
        </View>
        <Text
          selectable
          style={{
            left: 10,
            ...FONTS.h4,
            color: COLORS.white,
            textTransform: 'capitalize',
          }}>
          Need Cleaning
        </Text>
      </View>
    </View>
  );
};

export default Notification;
