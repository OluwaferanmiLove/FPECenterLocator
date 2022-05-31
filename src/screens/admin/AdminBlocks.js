import React, {useContext, useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../../context/AppContext';
import { generateColor } from '../../util/randomColor';
import ImageView from '../../components/ImageView';
import Input from '../../components/Input';
import ClassCard from '../../components/ClassCard';
import CenterCard from '../../components/CenterCard';
import HeaderLite from '../../components/HeaderLite';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getDocs, getFirestore, collection, getDoc } from 'firebase/firestore';
import Button from '../../components/Button';

function AdminBlocks ({navigation}) {
  const [blocks, setBlocks] = useState([]);
  const {state} = useContext(AppContext);

  const db = getFirestore();

  const blocksRef = collection(db, 'blocks');

  useEffect(() => {
    const getBlocks = async () => {
      let blocks = await getDocs(blocksRef);
      let allBlocks = blocks.docs.map((item) => {
        return item.data();
      })
      // blocks.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.data());
      // });
      setBlocks(allBlocks)
      console.log(allBlocks)
    }
  
    getBlocks();
  }, [])

  const handleDirectionNav = (data) => {
    navigation.navigate('Direction', data);
  }

  //get user data in firestore

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <HeaderLite title={'Blocks/Building'} onPress={() => navigation.goBack()} />
      <ScrollView style={{flex: 1, marginHorizontal: wp(20),}} showsVerticalScrollIndicator={false}>
        {/* <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Blocks/Buildings</Text>
        </View> */}
        <View style={styles.cardContainer}>
          {blocks.map((item, index) => (
            <CenterCard
              color={'#874d24'}
              title={item.blockName}
              subTitle={item.description}
              value={22}
              image={{uri: item.cover}}
              marginTop={hp(12)}
              onPress={() => handleDirectionNav(item)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.floatingBtn}>
        <Button
          dark
          title={'Add new block'}
          onPress={() => navigation.navigate('AdminAddBlock')}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    marginTop: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: wp(10)
  },
  description: {
    fontSize: wp(24),
    textTransform: 'capitalize',
    fontWeight: '300',
    color: '#000000ee'
  },
  name: {
    fontSize: wp(30),
    fontWeight: '500',
    color: '#000000'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: wp(35),
    borderRadius: 7,
    backgroundColor: colors.secondaryLighter + '30',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: hp(14),
    // paddingVertical: hp(22),
    borderRadius: wp(10),
    // backgroundColor: colors.primary,
  },
  sectionTitleContainer: {
    marginTop: hp(10),
  },
  sectionTitle: {
    fontSize: wp(18),
    fontWeight: '700',
    color: colors.primary
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp(10),
    paddingBottom: hp(130)
  },
  floatingBtn: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(50),
  },
})

export default AdminBlocks;