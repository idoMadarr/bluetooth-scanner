import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import useRNBluetoothClassic from './services/ClassicBluetooth/RNBluetoothClassic';
import {requestPermissions} from './utils/permissions';
import TextElement from './components/Reusable/TextElement';
import EStyleSheet from 'react-native-extended-stylesheet';
import StatusBarElement from './components/Reusable/StatusBarElement';
import Colors from './assets/design/palette.json';
import DeviceList from './components/DeviceList/DeviceList';
import {dimensions} from './utils/dimensions';
import SettingIcon from './assets/vectors/setting.svg';

EStyleSheet.build({});

function App(): React.JSX.Element {
  const {
    pairedDevicesList,
    availableDevicesList,
    getConnectedDevices,
    getBondedDevices,
    connect,
    unpairDevice,
    openBluetoothSettings,
    checkCurrentStatus,
    startDiscovery,
  } = useRNBluetoothClassic();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bluetoothStatus, setBluetoothStatus] = useState<boolean | null>(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await requestPermissions();
    const currentBluetoothStatus = await checkCurrentStatus();
    setBluetoothStatus(currentBluetoothStatus);

    if (currentBluetoothStatus) {
      setIsLoading(true);
      await getBondedDevices();
      await startDiscovery();
      setIsLoading(false);
    }
  };

  const statusColor =
    bluetoothStatus === null
      ? 'gray'
      : bluetoothStatus
      ? 'green'
      : Colors.warning;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        backgroundColor={Colors.black}
        barStyle={'light-content'}
      />
      <View style={[styles.header, styles.row]}>
        <View style={styles.row}>
          <View style={[styles.status, {backgroundColor: statusColor}]} />
          <TextElement fontSize={'lg'}>Bluetooth Scanner</TextElement>
        </View>
        <TouchableOpacity onPress={openBluetoothSettings}>
          <SettingIcon />
        </TouchableOpacity>
      </View>
      <DeviceList
        type={'Paired'}
        devicesList={pairedDevicesList}
        onUnpairDevice={unpairDevice}
      />
      <DeviceList
        type={'Available'}
        devicesList={availableDevicesList}
        connect={connect}
      />
      <View>
        {/* <Button title="Connected devices" onPress={getConnectedDevices} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black,
  },
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
  white: {color: 'white'},
});

export default App;
