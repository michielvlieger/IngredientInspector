import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Image } from 'expo-image';
import { Text } from '@/components/Themed';
import { PermissionInfo } from '@/components/PermissionInfo'
import { Product } from '@/components/Product'
import axios, { AxiosPromise } from 'axios';
import { productType } from '../interfaces/product.interface';
import { aiResultType } from '../interfaces/ai-result.interface';
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

  let createAIRun = async (photoUri: string, runName: string) => {
    const localUri = Platform.OS === 'ios' ? photoUri.replace('file://', '') : photoUri;
    const response = await fetch(localUri);
    const photoBlob = await response.blob();
    const arrayBuffer = await new Response(photoBlob).arrayBuffer();
    await axios.put(`https://iicomputervision.cognitiveservices.azure.com/computervision/productrecognition/aimodel/runs/${runName}?api-version=2023-04-01-preview`,
      arrayBuffer,
      {
        headers: { 'Ocp-Apim-Subscription-Key': '981d6f4220b94493a24b83e7d916a8b7', 'Content-Type': 'image/jpg' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }).catch(error => {
        console.log(error);
      });
  }

  let readAIRun = async (runName: string): Promise<aiResultType[]> => {
    return new Promise((resolve, reject) => {
      let i = 0;
      let intervalId = setInterval(async () => {
        if (i > 10) reject();

        await axios.get(`https://iicomputervision.cognitiveservices.azure.com/computervision/productrecognition/aimodel/runs/${runName}?api-version=2023-04-01-preview`,
          { headers: { 'Ocp-Apim-Subscription-Key': '981d6f4220b94493a24b83e7d916a8b7', 'Content-Type': 'application/json' } }).then(response => {
            if (response.data.status === 'succeeded') {
              resolve(response.data.result.products);
              clearInterval(intervalId);
            }
          }).catch(error => {
            console.log(error);
          });

        i++;
      }, 2000);
    })
  }

  let scanPhoto = async (photoUri: string) => {
    const runName = Date.now().toString();

    await createAIRun(photoUri, runName);
    const aiResults = await readAIRun(runName);

    let productArr: Array<productType> = [];
    let promises: Array<AxiosPromise> = [];
    aiResults.forEach(aiResult => {
      if (aiResult.tags[0].confidence > 0.8) {
        const productIndex = productArr.findIndex((product) => product.id === aiResult.tags[0].name);
        if (productIndex !== -1) {
          productArr[productIndex].boundingBoxes.push(aiResult.boundingBox)
        } else {
          let newProduct: productType = {
            id: aiResult.tags[0].name,
            image: '',
            name: '',
            brand: '',
            boundingBoxes: [],
          };
          newProduct.boundingBoxes.push(aiResult.boundingBox);
          productArr.push(newProduct);
          promises.push(axios.get('https://world.openfoodfacts.org/api/v2/product/' + aiResult.tags[0].name))
        }
      };
    });

    await Promise.all(promises).then(results => {
      results.forEach(response => {
        let productIndex = productArr.findIndex((product) => product.id === response.data.code);
        productArr[productIndex].name = response.data.product.product_name;
        productArr[productIndex].brand = response.data.product.brands;
        productArr[productIndex].image = response.data.product.image_front_small_url;
      });
    });

    return productArr;
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
    if (typeof scannedProducts === 'string') { return scannedProducts }
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
