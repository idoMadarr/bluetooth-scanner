import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {dimensions} from '../../utils/dimensions';
import TextElement from '../Reusable/TextElement';
import Colors from '../../assets/design/palette.json';
import SettingIcon from '../../assets/vectors/setting.svg';

interface HeaderType {
  bluetoothStatus: boolean | null;
  openBluetoothSettings(): void;
}

const Header: React.FC<HeaderType> = ({
  bluetoothStatus,
  openBluetoothSettings,
}) => {
  const statusColor =
    bluetoothStatus === null
      ? 'gray'
      : bluetoothStatus
      ? 'green'
      : Colors.warning;

  return (
    <View style={[styles.header, styles.row]}>
      <View style={styles.row}>
        <View style={[styles.status, {backgroundColor: statusColor}]} />
        <TextElement fontSize={'lg'}>Bluetooth Scanner</TextElement>
      </View>
      <TouchableOpacity onPress={openBluetoothSettings}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: dimensions.standardWidth,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});

export default Header;
