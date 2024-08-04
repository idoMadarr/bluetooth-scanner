import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import useRNBluetoothClassic from './services/ClassicBluetooth/RNBluetoothClassic';
import {requestPermissions} from './utils/permissions';
import EStyleSheet from 'react-native-extended-stylesheet';
import StatusBarElement from './components/Reusable/StatusBarElement';
import Colors from './assets/design/palette.json';
import DeviceList from './components/DeviceList/DeviceList';
import {AVAILABLE, PAIRED} from './types/types';
import Header from './components/Header/Header';

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

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        backgroundColor={Colors.black}
        barStyle={'light-content'}
      />
      <Header
        bluetoothStatus={bluetoothStatus}
        openBluetoothSettings={openBluetoothSettings}
      />
      <DeviceList
        type={PAIRED}
        devicesList={pairedDevicesList}
        onUnpairDevice={unpairDevice}
      />
      <DeviceList
        type={AVAILABLE}
        devicesList={availableDevicesList}
        connect={connect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

export default App;
