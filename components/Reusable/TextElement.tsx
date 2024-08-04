import React from 'react';
import {Dimensions, Platform, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../assets/design/palette.json';

const scaleFont = Dimensions.get('window').width > 420 && Platform.OS === 'ios';

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string | any;
  fontSize?: string;
  fontWeight?: string;
  cStyle?: object;
  numberOfLines?: number;
  testID?: string;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
  numberOfLines,
  testID,
}) => {
  const setFontFamily = (font: string = 'regular') =>
    font === 'bold'
      ? 'Poppins-Bold'
      : font === 'light'
      ? 'Poppins-Light'
      : 'Poppins-Regular';

  const setFontSize = (size: string = 'm') => {
    const fontSize =
      size === 'sm'
        ? '0.9rem'
        : size === 'm'
        ? '1rem'
        : size === 'lg'
        ? '1.5rem'
        : '2rem';

    return fontSize;
  };

  const styles = EStyleSheet.create({
    constants: {
      fontSize: setFontSize(fontSize),
      fontFamily: setFontFamily(fontWeight),
      color: Colors.white,
    },
  });

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.constants, {...cStyle}]}
      allowFontScaling={false}
      testID={testID}>
      {children}
    </Text>
  );
};

export default TextElement;
