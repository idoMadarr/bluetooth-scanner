import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import useRNBluetoothClassic from './services/ClassicBluetooth/RNBluetoothClassic';
import {requestPermissions} from './utils/permissions';
import EStyleSheet from 'react-native-extended-stylesheet';
import StatusBarElement from './components/Reusable/StatusBarElement';
import Colors from './assets/design/palette.json';
import DeviceList from './components/DeviceList/DeviceList';
import {AVAILABLE, PAIRED} from './types/types';
import Header from './components/Header/Header';

const {BluetoothModule} = NativeModules;
const bluetoothEvents = new NativeEventEmitter(BluetoothModule);

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
  const [bluetoothListener, setBluetoothListener] = useState<boolean>(false);
  const [bluetoothStatus, setBluetoothStatus] = useState<boolean | null>(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await requestPermissions();
    const currentBluetoothStatus = await checkCurrentStatus();
    setBluetoothStatus(currentBluetoothStatus);

    if (currentBluetoothStatus) {
      await BluetoothModule.startListening();
      setBluetoothListener(true);
      setIsLoading(true);
      // await getBondedDevices();
      await startDiscovery();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!bluetoothListener) return;
    console.log('HI!');

    // Subscribe to events
    bluetoothEvents.addListener('BluetoothConnected', deviceName => {
      console.log('Connected to:', deviceName);
    });

    bluetoothEvents.addListener('BluetoothDisconnected', deviceName => {
      console.log('Disconnected from:', deviceName);
    });

    () => {
      // BluetoothModule.stopListening();
    };
  }, [bluetoothListener]);

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
