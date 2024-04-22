import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, PermissionResponse } from 'expo-camera';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
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
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      />
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
    <Camera style={styles.container} type={CameraType.back} ref={(r) => {
      cameraRef = r
    }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: 20,
          justifyContent: 'space-between'
        }}>
        <View
          style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center'
          }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: '#fff'
            }} />
        </View>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
});

