import React, { useEffect, useState, useContext, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

function Direction({ navigation, route }) {
  const [location, setLocation] = useState({});
  const { state, dispatch } = useContext(AppContext);

  const directionInfo = route.params;

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let locationData = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});

        let location = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        };

        setLocation(location);

        // console.log({
        //   latitude: parseFloat(directionInfo.latitude),
        //   longitude: parseFloat(directionInfo.longitude),
        // })

        mapRef.current.animateToRegion(location, 1500);

      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        Location.watchPositionAsync({ timeInterval: 3000, accuracy: Location.Accuracy.BestForNavigation },
          (res) => {
            let location = {
              latitude: res.coords.latitude,
              longitude: res.coords.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }

            setLocation(location);

            // mapRef.current.animateCamera({
            //   center: {
            //     latitude: res.coords.latitude,
            //     longitude: res.coords.longitude,
            //   },
            //   pitch: 22,
            //   heading: res.coords.heading,
            //   zoom: 19
            // })
          })

      } catch (e) {
        console.log(e);
      }
    })();
  }, [])

  return (
    // <SafeAreaView style={styles.main}>
    //   <HeaderLite title={'Direction'} onPress={() => navigation.goBack()} />
    <View style={styles.main}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        {directionInfo.latitude && directionInfo.longitude && (
          <Marker
            coordinate={{
              latitude: directionInfo.latitude ? parseFloat(directionInfo.latitude) : 0,
              longitude: directionInfo.longitude ? parseFloat(directionInfo.longitude) : 0,
            }}
          />
        )}
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude ? location.latitude : 0,
              longitude: location.longitude ? location.longitude : 0,
            }}
          />
        )}
        {location.latitude && location.longitude && directionInfo.latitude && directionInfo.longitude && (
          <MapViewDirections
            origin={location}
            destination={{
              latitude: parseFloat(directionInfo.latitude),
              longitude: parseFloat(directionInfo.longitude),
            }}
            mode={'WALKING'}
            apikey={'AIzaSyDEvI_1pSCp9V5hTDZP0Gl1LDq67l_3N6g'} // insert your API Key here
            strokeWidth={4}
            strokeColor={colors.primary}
            splitWaypoints={true} onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              // mapRef.current.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: wp(25),
              //     bottom: hp(20),
              //     left: wp(25),
              //     top: hp(120),
              //   }
              // });
            }}
          />
        )}
        {/* <Marker
          draggable
          // onDrag={(coords) => console.log(coords)}
          onPress={e => console.log(e.nativeEvent)}
          coordinate={{
            latitude: location.latitude ? location.latitude : 0,
            longitude: location.longitude ? location.longitude : 0,
          }}
          // image={require('../../asset/customMarker.png')}
        /> */}
      </MapView>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconContainer}>
            <Ionicons name={'arrow-back'} size={wp(30)} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity>
          <View style={styles.infoContainer}>
            <Image
              source={{ uri: directionInfo.cover }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{directionInfo.blockName}</Text>
              <Text style={styles.subTitle} numberOfLines={2}>{directionInfo.description}</Text>
              {/* <Text style={styles.subTitle}>BI1, BI2, BI3, Bi4</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  map: {
    flex: 1,
    // alignItems: 'center',
    // marginTop: hp(20),
    // paddingHorizontal: wp(20),
  },
  back: {
    position: 'absolute',
    top: hp(55),
    left: wp(20),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(50),
    height: wp(50),
    borderRadius: 999,
    backgroundColor: colors.white + '80',
  },
  content: {
    position: 'absolute',
    width: wp(370),
    bottom: hp(50),
    // flex: 1,
    alignItems: 'center',
    // marginTop: hp(20),
    // paddingHorizontal: wp(20),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(15),
    paddingVertical: hp(20),
    // position: 'absolute',
    width: wp(350),
    height: hp(105),
    borderRadius: wp(8),
    backgroundColor: colors.white
  },
  image: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(6)
  },
  info: {
    flex: 1,
    marginLeft: wp(10),
  },
  title: {
    color: colors.primary,
    fontSize: wp(22),
    fontWeight: '700',
  },
  subTitle: {
    color: '#aaaaaa',
    marginTop: hp(6),
    fontSize: wp(14),
  },
})

export default Direction;