import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/palette/colors.json';

// Components
import TextElement from './TextElement';

interface ButtonElementType {
  title: string;
  onPress(): void;
  backgroundColor: string;
  titleColor: string;
  fontWeight?: string;
  fontSize?: string;
  disable?: boolean;
  cStyle?: {};
  children?: JSX.Element;
  iconPosition?: number | any;
  testID?: string;
}

const ButtonElement: React.FC<ButtonElementType> = ({
  title,
  onPress,
  backgroundColor,
  titleColor,
  fontWeight,
  fontSize,
  disable = false,
  children,
  cStyle,
  iconPosition,
  testID,
}) => {
  const ButtonActivityType = disable ? View : (TouchableOpacity as any);

  return (
    <ButtonActivityType onPress={onPress} activeOpacity={0.7} testID={testID}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: disable ? Colors.disable : backgroundColor},
          {...cStyle},
        ]}>
        <TextElement
          fontSize={fontSize || 'm'}
          fontWeight={fontWeight || 'demi-bold'}
          cStyle={{color: disable ? Colors.greyish : titleColor}}>
          {title}
        </TextElement>
        {children && (
          <View
            style={[
              styles.iconContainer,
              {
                right: iconPosition || '8%',
              },
            ]}>
            {children}
          </View>
        )}
      </View>
    </ButtonActivityType>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: PropDimensions.buttonWidth,
    height: PropDimensions.buttonHight,
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
  },
});

export default ButtonElement;
