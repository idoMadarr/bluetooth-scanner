import {Dimensions} from 'react-native';

export const dimensions = {
  standardWidth: Dimensions.get('window').width * 0.85,
  fullWidth: Dimensions.get('window').width,
  fullHeight: Dimensions.get('window').height,
  deviceHight: Dimensions.get('window').height * 0.09,
};
