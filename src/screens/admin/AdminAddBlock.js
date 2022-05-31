import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import ImageView from '../../components/ImageView';
import ActionCard from '../../components/ActionCard';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from 'react-native-modal';
import AdminCamera from './AdminCamera';
import { addBlockData } from '../../context/action';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications';
import * as Location from 'expo-location';

function AdminAddBlock({ navigation, route }) {
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const toast = useToast();
  const db = getFirestore();

  const handleTextChange = (type, value) => {
    let blockData = state.addBlockData;
    console.log(blockData);
    switch (type) {
      case 'blockName':
        blockData = { ...blockData, blockName: value }
        break;
      case 'description':
        blockData = { ...blockData, description: value }
        break;
      case 'longitude':
        blockData = { ...blockData, longitude: value }
        break;
      case 'latitude':
        blockData = { ...blockData, latitude: value }
        break;
      default:
        break;
    }
    dispatch(addBlockData(blockData))
    console.log(state.addBlockData)
  }

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let locationData = await Location.getCurrentPositionAsync({});

        let location = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }

        setLocation(location);
        dispatch(addBlockData({
          ...state.addBlockData,
          latitude: location.latitude,
          longitude: location.longitude
        }))
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleAddBlock = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, 'blocks', state.addBlockData.blockName);
  
        // set user data in firestore
        let userInfo = await setDoc(userRef, state.addBlockData);
        console.log(userInfo);
        toast.show('Block added successfull');
        dispatch(addBlockData({cover: null}));
        setLoading(false)
    } catch (e) {
        setLoading(false)
        console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Add Block/Buildings'} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <ImageView
          borderRadius={wp(8)}
          width={wp(335)}
          // allowChange={true}
          onPressUpload={() => setShowCamera(true)}
          image={state.addBlockData.cover && { uri: state.addBlockData.cover }}
          height={hp(335)}
        />
        <View style={{ marginTop: hp(15), flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Input
              label={'Block name'}
              onChangeText={(value) => handleTextChange('blockName', value)}
              value={state.addBlockData.blockName}
              placeholder={'Enter block name'} />
            <Input
              label={'Description'}
              placeholder={'Enter description'}
              onChangeText={(value) => handleTextChange('description', value)}
              value={state.addBlockData.description}
              marginTop={hp(20)} />
            <Input
              label={'Longitude'}
              placeholder={'Enter longitude'}
              onChangeText={(value) => handleTextChange('longitude', value)}
              value={state.addBlockData.longitude ? state.addBlockData.longitude.toString() : 0}
              editable={false}
              marginTop={hp(20)} />
            <Input
              label={'Latitude'}
              placeholder={'Enter latitude'}
              onChangeText={(value) => handleTextChange('latitude', value)}
              value={state.addBlockData.latitude ? state.addBlockData.latitude.toString() : 0}
              editable={false}
              marginTop={hp(20)} />
          </View>
        </View>
        {/* <View style={styles.roleContainer}>
          <Text style={styles.description}>{detail.language}</Text>
        </View> */}
        <View style={{ marginTop: hp(25) }}>
          <Button
            onPress={() => handleAddBlock()}
            title={'Add Block/Building'}
            loading={loading}
            dark />
        </View>
      </ScrollView>
      <Modal
        isVisible={showCamera}
        coverScreen={false}
        hasBackdrop={true}
        backdropOpacity={0.5}
        swipeDirection={'down'}
        onSwipeComplete={() => setShowCamera(false)}
        onBackdropPress={() => setShowCamera(false)}
        animationIn={'fadeIn'}
        style={{
          // width: '100%',
          // bottom: 0,
          margin: 0,
          height: '100%',
          justifyContent: 'flex-end',
          // backgroundColor: colors.mainBg,

        }}>
        <AdminCamera
          onPressBack={() => setShowCamera(false)}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  content: {
    // alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  title: {
    fontSize: hp(25),
    fontWeight: '700',
    color: colors.primary,
  },
  roleContainer: {
    backgroundColor: colors.primary + 20,
    marginTop: hp(8),
    paddingVertical: wp(4),
    paddingHorizontal: wp(25),
    borderRadius: wp(9999)
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    marginTop: hp(8),
    fontSize: hp(16),
    color: colors.primary,
  },
  price: {
    fontSize: hp(25),
    fontWeight: '700',
    color: colors.primary,
  },
  actionContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: hp(10),
    marginBottom: hp(25),
  },
})

export default AdminAddBlock;