import { BoundingBoxInterface, ProductInterface } from '@interfaces';
import { Text, View } from 'react-native';


type Props = {
    product: ProductInterface;
    difference: number;
    boundingBox: BoundingBoxInterface;
};

export function ProductIndicator({ product, difference, boundingBox }: Props) {
    return (
        <View style={{
            top: Number(boundingBox.y) / difference,
            left: Number(boundingBox.x) / difference,
            width: Number(boundingBox.w) / difference,
            height: Number(boundingBox.h) / difference,
            backgroundColor: product.hasCheckedIngredient ? 'rgba(255,0,0,0.3)' : 'rgba(0,255,0,0.3)',
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: product.hasCheckedIngredient ? 'rgba(255,0,0,0.8)' : 'rgba(0,255,0,0.8)',
            position: 'absolute'
        }} />
    )
}
