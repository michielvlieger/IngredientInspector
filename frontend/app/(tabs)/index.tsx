import { StyleSheet } from 'react-native';
import { Text, View } from 'components/Themed';
import CheckboxList from 'components/CheckboxList';

export default function TabOneScreen() {
  const items = [
    {
      label: "Hello",
      value: "World",
      checked: true,
    },
    {
      label: "World",
      value: "Hello",
      checked: false,
    }
  ];

  return (
    <View style={styles.container}>
      <CheckboxList items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
