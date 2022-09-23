import React from 'react';
import {Text, View, Button} from 'react-native';
import Video from 'react-native-video';
import videodata from '../img/demo.gif';

const WaterVideo = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlaying = () => {};

  return (
    <View>
      <Video
        source={{uri:"http://192.168.0.131"}}
        paused={!isPlaying}
        controls={true}
        style={{width: 200, height: 200, margin: 20,backgroundColor:'red'}}
        muted={isMuted}
      />
      <Button
        onPress={() => setIsPlaying(p => !p)}
        title={isPlaying ? 'Stop' : 'Play'}
      />
      <Button
        onPress={() => setIsMuted(m => !m)}
        title={isMuted ? 'Unmute' : 'Mute'}
      />
    </View>
  );
};

export default WaterVideo;
