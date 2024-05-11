import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { CheckboxOption } from '@interfaces/checkbox-option.interface';

const CheckboxList: React.FC<{ items: CheckboxOption[] }> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<CheckboxOption[]>(items);

  const handleCheckboxChange = (index: number) => {
    const newItems = [...checkedItems];
    newItems[index] = {
      ...newItems[index],
      checked: !newItems[index].checked
    };
    setCheckedItems(newItems);
  };

  return (
    <View>
      {checkedItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Checkbox
            value={item.checked}
            onValueChange={() => handleCheckboxChange(index)}
            color={item.checked ? '#4630EB' : undefined}
          />
          <Text>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 12
  }
});

export default CheckboxList;
