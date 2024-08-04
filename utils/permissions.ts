import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';

export const requestPermissions = async () => {
  const granted = await requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ]);

  if (
    granted['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_SCAN'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_ADVERTISE'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_CONNECT'] === RESULTS.GRANTED
  ) {
    return true;
  }
  return false;
};
