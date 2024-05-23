import { Platform, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { View } from '@/components/Themed';
import { PermissionInfo } from '@/components/PermissionInfo'
import { ScannerResult } from '@/components/ScannerResult'
import axios, { AxiosPromise } from 'axios';
import { AIResultInterface, IngredientsInterface, OpenfoodfactsIngredientInterface, ProductInterface } from '@interfaces/index.interface';



export default function TabTwoScreen() {
  const colorScheme = Colors[useColorScheme() ?? 'light'];
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionResponse>();
  const [scannerResult, setScannerResult] = useState<ProductInterface[]>();
  const [photoUri, setPhotoUri] = useState<string>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission);
    })();
  }, []);

  const getIngredients = (ingredients: OpenfoodfactsIngredientInterface[]) => {
    let ingredientArr: IngredientsInterface[] = []
    ingredients.forEach((ingredient: OpenfoodfactsIngredientInterface) => {
      if ('ingredients' in ingredient && ingredient.ingredients) {
        ingredientArr = ingredientArr.concat(getIngredients(ingredient.ingredients))
      } else {
        ingredientArr.push({ key: ingredient.id, name: ingredient.text });
      };
    });
    return ingredientArr
  }

  //   const createAIRun = async (photoUri: string, runName: string) => {
  //     const localUri = Platform.OS === 'ios' ? photoUri.replace('file://', '') : photoUri;
  //     const response = await fetch(localUri);
  //     const photoBlob = await response.blob();
  //     const arrayBuffer = await new Response(photoBlob).arrayBuffer();
  //     await axios.put(`https://iicomputervision.cognitiveservices.azure.com/computervision/productrecognition/aimodel/runs/${runName}?api-version=2023-04-01-preview`,
  //       arrayBuffer,
  //       {
  //         headers: { 'Ocp-Apim-Subscription-Key': '981d6f4220b94493a24b83e7d916a8b7', 'Content-Type': 'image/jpg' },
  //         maxBodyLength: Infinity,
  //         maxContentLength: Infinity,
  //       }).catch(error => {
  //         console.error(error);
  //       });
  //   }

  //   const readAIRun = async (runName: string): Promise<AIResultInterface[]> => {
  //     return new Promise((resolve, reject) => {
  //       let i = 0;
  //       /**
  //        * TODO: use websockets or while loop with timeout
  //        * Doesn't await the response of request before going to next interval
  //        */
  //       const intervalId = setInterval(async () => {
  //         if (i > 5) reject();

  //         await axios.get(`https://iicomputervision.cognitiveservices.azure.com/computervision/productrecognition/aimodel/runs/${runName}?api-version=2023-04-01-preview`,
  //           { headers: { 'Ocp-Apim-Subscription-Key': '981d6f4220b94493a24b83e7d916a8b7', 'Content-Type': 'application/json' } }).then(response => {
  //             if (response.data.status === 'succeeded') {
  //               resolve(response.data.result.products);
  //               clearInterval(intervalId);
  //             }
  //           }).catch(error => {
  //             console.error(error);
  //           });

  //         i++;
  //       }, 2000);
  //     })
  //   }

  //   const scanPhoto = async (photoUri: string) => {
  //     const runName = Date.now().toString();

  //     await createAIRun(photoUri, runName);
  //     const aiResults = await readAIRun(runName);

  const productArr: ProductInterface[] = [];
  const promises: AxiosPromise[] = [];
  aiResults.forEach(aiResult => {
    if (aiResult.tags[0].confidence > 0.8) {
      const productIndex = productArr.findIndex((product) => product.id === aiResult.tags[0].name);
      if (productIndex !== -1) {
        productArr[productIndex].boundingBoxes.push(aiResult.boundingBox)
      } else {
        const newProduct: ProductInterface = {
          id: aiResult.tags[0].name,
          image: '',
          name: '',
          brand: '',
          boundingBoxes: [],
          ingredients: [],
          isOkayForUser: false,
        };
        newProduct.boundingBoxes.push(aiResult.boundingBox);
        productArr.push(newProduct);
        promises.push(axios.get(`https://world.openfoodfacts.org/api/v2/product/${aiResult.tags[0].name}`))
      }
    };
  });

  await Promise.all(promises).then(results => {
    results.forEach(async response => {
      const productIndex = productArr.findIndex((product) => product.id === response.data.code);
      productArr[productIndex].name = response.data.product.product_name;
      productArr[productIndex].brand = response.data.product.brands;
      productArr[productIndex].image = response.data.product.image_front_small_url;
      if ('ingredients' in response.data.product) {
        productArr[productIndex].ingredients = getIngredients(response.data.product.ingredients);
        /**
         * TODO: find ingredients that the user doesn't want and look if it is in productArr[productIndex].ingredients
         * 
         * temperarily giving random value
         */
        // const badIngredients = await database.get('ingredients').query(
        //   Q.where('toggled', true)
        // ).fetch();
        productArr[productIndex].isOkayForUser = Math.random() < 0.5;
      }

    });
  }).catch(error => console.error(error));

  //     return productArr;
  //   }

  let cameraRef: Camera | null;
  const takePicture = async () => {
    if (!cameraRef) return;
    const options = {
      quality: 1,
      base64: false,
      exif: false
    };
    const newPhoto = await cameraRef.takePictureAsync(options);
    setPhotoUri(newPhoto.uri);
    const scannedProducts = await scanPhoto(newPhoto.uri);
    setScannerResult(scannedProducts)
  }

  //   if (!hasCameraPermission) {
  //     return <PermissionInfo text='Toestemming aan het laden...' colorScheme={colorScheme} />
  //   } else if (!hasCameraPermission.status) {
  //     return <PermissionInfo text='Zet uw camerapermissie aan in uw instellingen.' colorScheme={colorScheme} />
  //   }

  if (photoUri) {
    return (
      <ScrollView>
        <View style={{ height: 400, minHeight: 150, backgroundColor: colorScheme.tintedBackground, marginBottom: 40 }}>
          <TouchableOpacity
            onPress={() => {
              setScannerResult(undefined);
              setPhotoUri(undefined);
            }}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
            }}>
            <Ionicons name="chevron-back-circle" size={30} color={'white'} />
          </TouchableOpacity>
          <Image
            source={{ uri: photoUri }}
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
          <ScannerResult scannerResult={scannerResult} colorScheme={colorScheme} />
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
          testID="take-photo-button"
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
