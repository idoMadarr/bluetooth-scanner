import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {
  StateChangeEvent,
  BluetoothEventType,
  BluetoothDeviceEvent,
} from 'react-native-bluetooth-classic/lib/BluetoothEvent';

const useRNBluetoothClassic = () => {
  const [pairedDevicesList, setPairedDevicesList] = useState<any[]>([]);
  const [availableDevicesList, setAvailableDevicesList] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const subscriptionConnect =
      RNBluetoothClassic.onDeviceConnected(onDeviceConnected);

    const subscriptionDisconnect =
      RNBluetoothClassic.onDeviceDisconnected(onDeviceDisconnected);

    const subscriptionError = RNBluetoothClassic.onError(onDeviceError);

    return () => {
      subscriptionConnect.remove();
      subscriptionDisconnect.remove();
      subscriptionError.remove();
    };
  }, []);

  useEffect(() => {
    // BluetoothEventListener<StateChangeEvent> is notified when the device enable/disable Bluetooth.
    const enabledSubscription =
      RNBluetoothClassic.onBluetoothEnabled(onStateChange);

    return () => {
      enabledSubscription.remove();
    };
  }, []);

  const onDeviceConnected = (event: BluetoothDeviceEvent) => {
    Alert.alert('CONNECT EVENT!', JSON.stringify(event));
  };

  const onDeviceDisconnected = (event: BluetoothDeviceEvent) => {
    Alert.alert('DISCONNECT EVENT!', JSON.stringify(event));
  };

  const onDeviceError = (event: BluetoothDeviceEvent) => {
    Alert.alert('ERROR EVENT!', JSON.stringify(event));
  };

  const onStateChange = (event: StateChangeEvent) => {
    Alert.alert('Bluetooth Enabled!', JSON.stringify(event));
  };

  const getConnectedDevices = async () => {
    const connected = await RNBluetoothClassic.getConnectedDevices();
    console.log(connected);
    return connected;
  };

  const openBluetoothSettings = () => {
    RNBluetoothClassic.openBluetoothSettings();
  };

  const startDiscovery = async () => {
    const avilableDevices = await RNBluetoothClassic.startDiscovery();
    setAvailableDevicesList(avilableDevices);
    cancelDiscovery();
  };

  const cancelDiscovery = async () => {
    await RNBluetoothClassic.cancelDiscovery();
  };

  const unpairDevice = async (device: any) => {
    await RNBluetoothClassic.unpairDevice(device.address);
    Alert.alert(`Unpair ${device.name} from your device`);
  };

  const connect = async (device: any) => {
    try {
      const isConnected: boolean = await device.isConnected();

      if (isConnected) {
        return await device.disconnect();
      }

      const deviceConnection = await device.connect({
        // CONNECTOR_TYPE: 'rfcomm',
        // DELIMITER: '\n',  // Adjust if necessary
        // DEVICE_CHARSET: Platform.OS === 'ios' ? 1536 : 'utf-8',
        // UUID: '00001101-0000-1000-8000-00805f9b34fb',  // Example UUID
        SECURE: true, // Adjust if necessary b
      });

      // const deviceConnection = await device.connect({
      // CONNECTOR_TYPE: 'rfcomm',
      // DELIMITER: '\n',
      // DELIMITER: '9',
      // DEVICE_CHARSET: Platform.OS === 'ios' ? 1536 : 'utf-8',
      // SECURE: true,
      // });

      if (deviceConnection) {
        console.log(device.address, 'Conneted!');
        // const res = await RNBluetoothClassic.connectToDevice(device.address);
        // console.log(res, 'res');
        //   await RNBluetoothClassic.accept({});
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getBondedDevices = async () => {
    const paired = await RNBluetoothClassic.getBondedDevices();
    setPairedDevicesList(paired);
  };

  const checkCurrentStatus = async () => {
    const available = await RNBluetoothClassic.isBluetoothAvailable();
    const enabled = await RNBluetoothClassic.isBluetoothEnabled();

    if (available && enabled) {
      return true;
    }
    return false;
  };

  return {
    connect,
    startDiscovery,
    cancelDiscovery,
    getConnectedDevices,
    getBondedDevices,
    unpairDevice,
    openBluetoothSettings,
    checkCurrentStatus,
    availableDevicesList,
    pairedDevicesList,
    connectedDevice,
    error,
  };
};

export default useRNBluetoothClassic;
