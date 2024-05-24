import { ProductInterface, ColorSchemeInterface } from '@interfaces';
import { Product } from "./Product";
import { Text, View } from './Themed';

type Props = {
    scannerResult: ProductInterface[] | undefined;
    colorScheme: ColorSchemeInterface;
};

export function ScannerResult({ scannerResult, colorScheme }: Props) {
    if (!scannerResult) {
        return (
            <View>
                <Text style={{
                    color: colorScheme.text
                }}>De foto wordt gescanned.</Text>
            </View>
        )
    }
    const productViews: React.JSX.Element[] = [];
    scannerResult?.map(product => { productViews.push(<Product key={product.id} product={product} colorScheme={colorScheme} />) })
    return (
        <View>
            <Text style={{
                color: colorScheme.text,
                fontSize: 35,
                fontWeight: 'bold',
                marginBottom: 10
            }}>Products</Text>
            {scannerResult?.length === 0 ? <Text style={{ color: colorScheme.text }}>IngredientInspector kon geen producten herkennen op de foto.</Text> : productViews}
        </View>
    )
}