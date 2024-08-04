export interface DeviceType {
  address: string;
  bonded: true;
  deviceClass: {
    deviceClass: number;
    majorClass: number;
  };
  extra: {};
  id: string;
  name: string;
  rssi: undefined;
}
