import { ColorSchemeInterface, ProductInterface } from '@interfaces';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

type Props = {
    product: ProductInterface;
    colorScheme: ColorSchemeInterface
};

export function Product({ product, colorScheme }: Props) {
    return (
        <View style={{
            flexDirection: 'row',
            marginVertical: 10,
            flex: 1
        }}>
            <View style={{
                width: 80,
                height: 80,
                backgroundColor: colorScheme.tintedBackground,
                marginRight: 10,
                padding: 7,
                borderRadius: 10
            }} >
                <Image
                    source={{ uri: product.image }}
                    contentFit='contain'
                    style={{
                        flex: 1
                    }} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={{
                    color: colorScheme?.text,
                    fontSize: 20,
                    fontWeight: '700'
                }}>{product.brand}</Text>
                <Text style={{
                    color: colorScheme?.text,
                    fontSize: 15,
                }}>{product.name}</Text>
            </View>

        </View>
    )
}
