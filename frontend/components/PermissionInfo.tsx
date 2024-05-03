import { colorSchemeType } from '@/constants/Colors';
import { Text, View } from 'react-native';

type Props = {
    text: string,
    colorScheme: colorSchemeType
};

export function PermissionInfo({ text, colorScheme }: Props) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorScheme.background
            }}>
            <Text style={{
                color: colorScheme.text,
                fontSize: 20,
            }}>{text}</Text>
        </View>
    )
}