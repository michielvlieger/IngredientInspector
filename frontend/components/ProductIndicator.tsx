import { BoundingBoxInterface, ProductInterface } from '@interfaces';
import { Text, View } from 'react-native';


type Props = {
    product: ProductInterface;
    difference: number;
    boundingBox: BoundingBoxInterface;
};

export function ProductIndicator({ product, difference, boundingBox }: Props) {
    let backgroundColor;
    let borderColor;
    switch (product.hasCheckedIngredient) {
        case null:
            backgroundColor = 'rgba(255,255,0,0.3)';
            borderColor = 'rgba(255,255,0,0.8)';
            break;
        case true:
            backgroundColor = 'rgba(255,0,0,0.3)';
            borderColor = 'rgba(255,0,0,0.8)';
            break;
        case false:
            backgroundColor = 'rgba(0,255,0,0.3)';
            borderColor = 'rgba(0,255,0,0.8)';
            break;

    }
    return (
        <View style={{
            top: Number(boundingBox.y) / difference,
            left: Number(boundingBox.x) / difference,
            width: Number(boundingBox.w) / difference,
            height: Number(boundingBox.h) / difference,
            backgroundColor: backgroundColor,
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: borderColor,
            position: 'absolute'
        }} />
    )
}
