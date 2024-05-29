import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Colors } from '@constants';
import { CheckboxInterface } from '@interfaces';

const CheckboxComponent: React.FC<CheckboxInterface> = ({ id, label, checked, onValueChange }) => {
  const colorScheme = Colors[useColorScheme() ?? 'light'];
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

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
        color={isChecked ? colorScheme.tint : undefined}
        accessibilityLabel="Checkbox Label"
      />
      <Text style={{ color: colorScheme.text }}>{label}</Text>
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
