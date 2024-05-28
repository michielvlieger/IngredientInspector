import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  styleType: 'primary' | 'inline';
}

const ButtonComponent: React.FC<ButtonProps> = ({ title, onPress, styleType }) => {
  const colorScheme = Colors[useColorScheme() ?? 'light'];
  const styles = styleType === 'primary' ? createPrimaryStyles(colorScheme) : createInlineStyles(colorScheme);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const createPrimaryStyles = (colorScheme: any) => StyleSheet.create({
  button: {
    backgroundColor: colorScheme.text,  // Use the text color for the button background
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: colorScheme.background,  // Use the background color for the text
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const createInlineStyles = (colorScheme: any) => StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 8,
    margin: 12,
    marginEnd: -6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorScheme.text,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colorScheme.text,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ButtonComponent;
