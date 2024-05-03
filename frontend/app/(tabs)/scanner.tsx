import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors, { colorSchemeType } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Image } from 'expo-image';
import { Text } from '@/components/Themed';
import { PermissionInfo } from '@/components/PermissionInfo'
import { Product } from '@/components/Product'
import axios, { AxiosPromise } from 'axios';
import { productType } from '../interfaces/product.interface';
import { scannerResultType } from '../interfaces/scanner-result.interface';

export default function TabTwoScreen() {
  const colorScheme = Colors[useColorScheme() ?? 'light']
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionResponse>();
  const [scannerResult, setScannerResult] = useState<scannerResultType>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission);
    })();
  }, []);

  let scanPhoto = async (photoUri: string) => {
    //call AI to get list of products
    //for now a hardcoded list of ingredients
    const productIds = [8717903964156, 8717903961056, 8710448464129, 8710448634744, 8717903961254, 8710448564546, 4718901825870, 8711200559435, 8720182286604];
    //call openfoodfacts to get product information
    let productArr: Array<productType> = [];
    let promises: Array<AxiosPromise> = [];
    productIds.forEach(productId => { promises.push(axios.get('https://world.openfoodfacts.org/api/v2/product/' + productId)) })
    await Promise.all(promises).then(results => {
      results.forEach(response => {
        let product: productType = {
          id: response.data.code,
          image: response.data.product.image_front_small_url,
          name: response.data.product.product_name,
          brand: response.data.product.brands,
        }
        productArr.push(product)
      })
    })
    return productArr
  }

  let cameraRef: Camera | null;
  let takePicture = async () => {
    if (!cameraRef) return;
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
    let newPhoto = await cameraRef.takePictureAsync(options);
    let scannedProducts = await scanPhoto(newPhoto.uri);
    setScannerResult({ photoUri: newPhoto.uri, products: scannedProducts })
  }

  if (!hasCameraPermission) {
    return <PermissionInfo text='Requesting permission...' colorScheme={colorScheme} />
  } else if (!hasCameraPermission.status) {
    return <PermissionInfo text='Please enable camera permission in settings.' colorScheme={colorScheme} />
  }

  if (scannerResult) {
    let productViews: Array<React.JSX.Element> = [];
    scannerResult.products.map(product => { productViews.push(<Product key={product.id} product={product} colorScheme={colorScheme} />) })
    return (
      <ScrollView>
        <View style={{ height: 400, minHeight: 150, backgroundColor: colorScheme.tintedBackground, marginBottom: 40 }}>
          <TouchableOpacity
            onPress={() => setScannerResult(undefined)}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
            }}>
            <Ionicons name="chevron-back-circle" size={30} color={'white'} />
          </TouchableOpacity>
          <Image
            source={{ uri: scannerResult.photoUri }}
            contentFit='contain'
            style={{
              zIndex: -1,
              flex: 1,
            }} />
        </View>
        <View style={{
          backgroundColor: colorScheme.background,
          paddingHorizontal: 30,
          paddingVertical: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
          <Text style={{
            color: colorScheme.text,
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 10
          }}>Products</Text>
          {productViews}
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column'
    }}>
      <Camera
        type={CameraType.back}
        style={{
          flex: 1
        }} ref={(r) => {
          cameraRef = r
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colorScheme.background,
          minHeight: 50,
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={takePicture}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: colorScheme.tint,
            justifyContent: 'center',
            alignItems: 'center',
          }} >
          <Feather name='camera' size={45} color={colorScheme.background} />
        </TouchableOpacity>
      </View>
    </View >
  );
}
