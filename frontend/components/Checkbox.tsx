import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { colors } from '@styles';
import { CheckboxInterface } from '@interfaces';

const CheckboxComponent: React.FC<CheckboxInterface> = ({ id, label, checked, onValueChange }) => {
  const [isChecked, setChecked] = useState(checked);

  const handleValueChange = (newCheckedValue: boolean) => {
    setChecked(newCheckedValue);

    if (onValueChange) {
      const newValue: CheckboxInterface = {
        id: id,
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
      <Text>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    marginRight: 12,
  },
});

export default CheckboxComponent;
