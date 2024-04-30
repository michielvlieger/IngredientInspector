import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, PermissionResponse } from 'expo-camera';
import { createRef, useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionResponse>();
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraPermission);
    })();
  }, []);

  if (!hasCameraPermission) {
    return <Text>Requesting permission.</Text>
  } else if (!hasCameraPermission) {
    return <Text>Please enable camera permission in settings.</Text>
  }

  if (photo) {
    return <View
      style={{
        flex: 1
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity
          onPress={() => setPhoto(undefined)}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
          }}>
          <Ionicons name="chevron-back-circle" size={30} color={'white'} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
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
    setPhoto(newPhoto);
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
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          minHeight: 50,
          padding: 20,
        }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
            backgroundColor: Colors[colorScheme ?? 'light'].tint,
            justifyContent: 'center',
            alignItems: 'center',
          }} >
          <Feather name='camera' size={45} color={Colors[colorScheme ?? 'light'].background} />
        </TouchableOpacity>
        </View>
    </View >
  );
}
