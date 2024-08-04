import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextElement from '../Reusable/TextElement';
import Colors from '../../assets/design/palette.json';
import {DeviceType} from '../../types/types';
import {dimensions} from '../../utils/dimensions';

interface AvailableDevicePropsType {
  device: DeviceType;
  connect(): void;
}

const AvailableDevice: React.FC<AvailableDevicePropsType> = ({
  device,
  connect,
}) => {
  return (
    <TouchableOpacity
      onPress={connect}
      activeOpacity={0.8}
      style={styles.deviceContainer}>
      <TextElement>{device.name}</TextElement>
      <TextElement fontSize={'sm'} fontWeight={'bold'}>
        {device.address}
      </TextElement>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceContainer: {
    width: dimensions.standardWidth,
    height: dimensions.deviceHight,
    justifyContent: 'center',
    backgroundColor: Colors['gradient--modal-start'],
    alignSelf: 'center',
    margin: 3,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: '5%',
  },
});

export default AvailableDevice;
