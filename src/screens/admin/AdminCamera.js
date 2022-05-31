import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../util/dimension';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from 'react-native-toast-notifications';
import { AppContext } from '../../context/AppContext';
import { addBlockData } from '../../context/action';

export default function AdminCamera({onPressBack}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { state, dispatch } = useContext(AppContext);

  const cameraRef = useRef(null);

  const toast = useToast()

  const handlePictureChange = (value) => {
    let blockData = state.addBlockData;
    blockData = {...blockData, cover: value}
    dispatch(addBlockData(blockData))
    console.log(state.addBlockData);

    onPressBack()
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    let photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });

    let base64Data = `data:image/jpeg;base64,${photo.base64}`
    let photoData = {
      data: base64Data,
      uri: photo.uri,
      height: photo.height,
      width: photo.width,
    }
    console.log(photo)
    setImage(photoData)
  }

  const uploadImage = async (uri) => {
    setLoading(true);
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const image = await fetch(uri);
    const imageBlob = await image.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${filename}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, imageBlob)
    .then((snapshot) => {
      snapshot.metadata.fullPath
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          console.log('File available at', downloadURL);
          handlePictureChange(downloadURL)
          setLoading(false);
          toast.show('Image uploaded successfully, continue with other data')
        });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
      {!image && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            zoom={0}
            autoFocus={true}
            type={type}
            onCameraReady={() => {
              console.log('true')
              setCameraReady(true)
            }}
            ratio={'1:1'}>
            {/* <View style={styles.boundryContainer}>
              <View style={styles.boundryTop} />
              <View style={styles.boundryBottom} />
            </View> */}
          </Camera>
        </View>
      )}
      {image && (
        <Image
          source={{uri: image.data}}
          style={{
            flex: 1,
            // width: image.width,
            // height: image.height,
            resizeMode: 'contain',
          }} />
      )}
      <View style={styles.shutter}>
        <TouchableOpacity style={{flex: 0.2}} onPress={onPressBack}>
          <Ionicons name={'arrow-back-circle'} color={colors.white + 50} size={wp(45)} />
        </TouchableOpacity>
        {!image && (
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={takePicture}>
            <Ionicons name={'scan-circle-outline'} color={colors.white} size={wp(60)} />
          </TouchableOpacity>
        )}
        {image && (
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => uploadImage(image.uri)}>
            <Ionicons name={'checkmark-circle-outline'} color={colors.white} size={wp(60)} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{flex: 0.2}}>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loading} >
          <ActivityIndicator size={'small'} color={colors.white} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    // flex: 1,
    width: wp(375),
    height: wp(375),
    resizeMode: 'contain'
  },
  boundryContainer: {
    flex: 1,
    marginTop: Platform.select({android: hp(25), ios: hp(60)}),
    alignItems: 'center',
  },
  boundryTop: {
    width: '85%',
    height: hp(50),
    borderWidth: wp(3),
    borderBottomWidth: 0,
    borderColor: colors.white + 70,
  },
  boundryBottom: {
    width: '85%',
    marginTop: hp(510),
    height: hp(50),
    borderWidth: wp(3),
    borderTopWidth: 0,
    borderColor: colors.white + 70,
  },
  shutter: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    width: '100%',
    height: hp(120),
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: hp(55),
  },
  loading: {
    position: 'absolute',
    width: wp(375),
    height: hp(812),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
});
