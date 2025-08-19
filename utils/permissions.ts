import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';

export const requestPermissions = async () => {
  const granted = await requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  ]);

  if (
    granted['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_SCAN'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_ADVERTISE'] === RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_CONNECT'] === RESULTS.GRANTED &&
    granted['android.permission.POST_NOTIFICATIONS'] === RESULTS.GRANTED &&
    granted['android.permission.ACCESS_COARSE_LOCATION'] === RESULTS.GRANTED
  ) {
    return true;
  }
  return false;
};
