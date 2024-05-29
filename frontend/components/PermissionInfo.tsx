import { ColorSchemeInterface } from '@interfaces';
import { Text, View } from 'react-native';

type Props = {
    text: string,
    colorScheme: ColorSchemeInterface;
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
