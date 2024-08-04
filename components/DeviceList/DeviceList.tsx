import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import TextElement from '../Reusable/TextElement';
import {DeviceType} from '../../types/types';
import {dimensions} from '../../utils/dimensions';
import PairedDevice from '../Device/PairedDevice';
import AvailableDevice from '../Device/AvailableDevice';

interface DeviceListType {
  type: string;
  devicesList: DeviceType[];
  onUnpairDevice?(device: DeviceType): void;
  connect?(device: DeviceType): void;
}

const DeviceList: React.FC<DeviceListType> = ({
  devicesList,
  type,
  onUnpairDevice,
  connect,
}) => {
  const EmptyDevicesList = (
    <View style={styles.empty}>
      <TextElement>{`Found no ${type} devices`}</TextElement>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.title}>
        <TextElement>{`${type} Devices:`}</TextElement>
      </View>
      <FlatList
        data={devicesList}
        keyExtractor={itemData => itemData.id}
        renderItem={({item}) =>
          onUnpairDevice ? (
            <PairedDevice
              device={item}
              onUnpairDevice={onUnpairDevice.bind(this, item)}
            />
          ) : connect ? (
            <AvailableDevice device={item} connect={connect.bind(this, item)} />
          ) : null
        }
        ListEmptyComponent={EmptyDevicesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: dimensions.fullWidth,
    maxHeight: Dimensions.get('window').height * 0.45,
  },
  title: {
    width: dimensions.standardWidth,
    alignSelf: 'center',
  },
  empty: {
    height: Dimensions.get('window').height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DeviceList;
