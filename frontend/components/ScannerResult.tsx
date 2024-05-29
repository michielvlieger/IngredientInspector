import { ProductInterface, ColorSchemeInterface } from '@interfaces';
import { Product } from "./Product";
import { ImageBackground } from 'expo-image';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ProductIndicator } from './ProductIndicator';
import { useEffect } from 'react';

type Props = {
    scannerResult: {
        products: ProductInterface[];
        imageMetadata: {
            height: number;
            width: number;
        }
    } | undefined;
    colorScheme: ColorSchemeInterface;
    handleResetScanner: () => {};
    photoUri: string;
};

export function ScannerResult({ scannerResult, colorScheme, handleResetScanner, photoUri }: Props) {
    if (!scannerResult) {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={photoUri}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <BlurView tint='light' style={{ padding: 20, borderRadius: 20, overflow: 'hidden' }}>
                        <Text style={{
                            color: colorScheme.text,
                            fontSize: 20,
                        }}>De foto wordt gescand</Text>
                        <ActivityIndicator size={'large'} />
                    </BlurView>
                </ImageBackground>
            </View>
        )
    }

    const productViews: React.JSX.Element[] = scannerResult?.products.map(product => <Product key={product.id} product={product} colorScheme={colorScheme} />)
    let ProductIndicators: React.JSX.Element[] = [];
    let key = 0;
    const difference = scannerResult.imageMetadata.height / 480;
    scannerResult?.products.forEach(product => {
        ProductIndicators = ProductIndicators.concat(product.boundingBoxes.map(boundingBox => <View key={key++}><ProductIndicator difference={difference} boundingBox={boundingBox} product={product} /></View>));
    });

    return (
        <View>
            <ScrollView>
                <View style={{ height: 480, backgroundColor: colorScheme.tintedBackground }}>
                    <TouchableOpacity
                        onPress={handleResetScanner}
                        style={{
                            position: 'absolute',
                            top: 50,
                            left: 20,
                        }}>
                        <Ionicons name="chevron-back-circle" size={30} color={'white'} />
                    </TouchableOpacity>
                    <ImageBackground
                        source={{ uri: photoUri }}
                        contentFit='contain'
                        style={{
                            flex: 1,
                            zIndex: -1,
                        }}>
                        {ProductIndicators}
                    </ImageBackground>
                </View>
                <View style={{
                    backgroundColor: colorScheme.background,
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}>
                    <Text style={{
                        color: colorScheme.text,
                        fontSize: 35,
                        fontWeight: 'bold',
                        marginBottom: 10
                    }}>Products</Text>
                    {scannerResult?.products.length === 0 ? <Text style={{ color: colorScheme.text }}>IngredientInspector kon geen producten herkennen op de foto.</Text> : productViews}
                </View>
            </ScrollView>
        </View>
    )
}