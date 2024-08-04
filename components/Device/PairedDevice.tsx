import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextElement from '../Reusable/TextElement';
import Colors from '../../assets/design/palette.json';
import {DeviceType} from '../../types/types';
import {dimensions} from '../../utils/dimensions';

interface PairedDevicePropsType {
  device: DeviceType;
  onUnpairDevice(): void;
}

const PairedDevice: React.FC<PairedDevicePropsType> = ({
  device,
  onUnpairDevice,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.deviceContainer}>
      <View>
        <TextElement>{device.name}</TextElement>
        <TextElement fontSize={'sm'} fontWeight={'bold'}>
          {device.address}
        </TextElement>
      </View>
      <View>
        <TouchableOpacity onPress={onUnpairDevice}>
          <TextElement>Unpaired</TextElement>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceContainer: {
    width: dimensions.standardWidth,
    height: dimensions.deviceHight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors['gradient--modal-start'],
    alignSelf: 'center',
    margin: 3,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: '5%',
  },
});

export default PairedDevice;
