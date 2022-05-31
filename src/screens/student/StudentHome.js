import React, {useContext, useEffect, useState} from 'react';
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
import { collection, getDocs, getFirestore } from 'firebase/firestore';

function StudentHome ({navigation}) {
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

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.description}>Hello, <Text style={styles.name}>{state.user.firstName}</Text></Text>
          </View>
          {/* <TouchableOpacity>
            <View  style={styles.iconContainer}>
              <Ionicons name={'log-out-outline'} size={wp(20)} color={colors.secondaryDarker} />
            </View>
          </TouchableOpacity> */}
          {/* <ImageView
            image={{uri: 'https://randomuser.me/api/portraits/women/8.jpg'}}
            width={wp(55)}
            height={wp(55)}
            /> */}
        </View>
        <View style={styles.infoContainer}>
          <Input
            iconName={'search'}
            iconColor={colors.primary + '70'}
            onFocus={() => console.log('OnFocus')}
            placeholder={'Search'} />
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Blocks/Buildings</Text>
        </View>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: wp(20),
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp(10)
  },
})

export default StudentHome;