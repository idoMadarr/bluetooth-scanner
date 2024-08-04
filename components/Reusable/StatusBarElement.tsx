import React from 'react';
import {StatusBar} from 'react-native';

interface StatusBarElementType {
  barStyle: any;
  backgroundColor: string;
}

const StatusBarElement: React.FC<StatusBarElementType> = ({
  barStyle,
  backgroundColor,
}) => {
  return <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />;
};

export default StatusBarElement;
