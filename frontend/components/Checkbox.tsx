import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { colors } from '@styles';
import { CheckboxInterface } from '@interfaces';

const CheckboxComponent: React.FC<CheckboxInterface> = ({ label, checked, categoryId, ingredientId, onValueChange }) => {
  const [isChecked, setChecked] = useState(checked);

  const handleValueChange = (newCheckedValue: boolean) => {
    setChecked(newCheckedValue);


    if (onValueChange) {
      const newValue: CheckboxInterface = {
        categoryId: categoryId,
        ingredientId: ingredientId,
        label: label,
        checked: newCheckedValue,
      }
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleValueChange}
        color={isChecked ? colors.primary : undefined}
        accessibilityLabel="Checkbox Label"
      />
      <Text style={styles.paragraph}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  paragraph: {
    fontSize: 15,
    color: '#000',
  },
  checkbox: {
    margin: 8,
  },
});

export default CheckboxComponent;
