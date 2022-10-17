import {Dimensions, PixelRatio} from 'react-native';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';
const {width, height} = Dimensions.get('window');

const widthToDo = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel(
    getPixelSizeForLayoutSize(width * givenWidth) / 100,
  );
};

const heightToDo = number => {
  let givenheight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel(
    getPixelSizeForLayoutSize(height * givenheight) / 100,
  );
};

export {widthToDo, heightToDo};
