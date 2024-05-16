import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  styleType: 'primary' | 'inline';
}

const ButtonComponent: React.FC<ButtonProps> = ({ title, onPress, styleType }) => {
  const styles = styleType === 'primary' ? primaryStyles : inlineStyles;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const primaryStyles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const inlineStyles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 8,
    margin: 12,
    marginEnd: -6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ButtonComponent;
