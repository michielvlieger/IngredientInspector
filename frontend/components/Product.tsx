import { ColorSchemeInterface, ProductInterface } from '@interfaces';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


type Props = {
    product: ProductInterface;
    colorScheme: ColorSchemeInterface
};

export function Product({ product, colorScheme }: Props) {
    let isOkayForUser = true;
    product.ingredients.forEach(ingredient => {
        if (ingredient.checked) isOkayForUser = false
    })
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
            <View style={{ flexDirection: 'column', flex: 1, paddingVertical: 5 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: "center"
                }}>
                    {isOkayForUser ? <AntDesign name="checkcircle" size={24} color="green" style={{ marginRight: 8 }} /> : <AntDesign name="closecircle" size={24} color="red" style={{ marginRight: 8 }} />}
                    <Text style={{
                        color: colorScheme?.text,
                        fontSize: 22,
                        fontWeight: '700',
                    }}>{product.brand}</Text>
                </View>
                <Text style={{
                    color: colorScheme?.text,
                    fontSize: 15,
                }}>{product.name}</Text>
            </View>

        </View>
    )
}
