import React, {useContext, useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../../context/AppContext';
import ActionCards from './components/ActionCards';
import { generateColor } from '../../util/randomColor';
import ImageView from '../../components/ImageView';
import { logout } from '../../context/action';
import { deleteFromStorage } from '../../util/storageUtil';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function AdminHome ({navigation}) {
  const {state, dispatch} = useContext(AppContext);
  const [centersNumber, setCentersNumber] = useState(0);
  const [adminNumber, setAdminNumber] = useState(0);
  const [blocksNumber, setBlocksNumber] = useState(0);

  const db = getFirestore();

  const centersRef = collection(db, 'centers');
  const adminsRef = query(collection(db, "users"), where("role", "==", 'admin'));
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
      setBlocksNumber(allBlocks.length)
    }
  
    getBlocks();
  }, [])

  useEffect(() => {
    const getAdmins = async () => {
      let admins = await getDocs(adminsRef);
      let allAdmins = admins.docs.map((item) => {
        return item.data();
      })
      setAdminNumber(allAdmins.length);
    }
  
    getAdmins();
  }, []);

  const handleLogOut = () => {
    deleteFromStorage('userData')
      .then((response) => {
        dispatch(logout())
        // dispatch(resetState())
      })
  }

  useEffect(() => {
    const getCenters = async () => {
      let centers = await getDocs(centersRef);
      let allCenters = centers.docs.map((item) => {
        return item.data();
      });
      
      setCentersNumber(allCenters.length);
      console.log(allCenters.length);
    }
  
    getCenters();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* <ImageView
            image={{uri: 'https://randomuser.me/api/portraits/women/8.jpg'}}
            width={wp(55)}
            height={wp(55)}
            /> */}
          <View style={styles.userInfoContainer}>
            <Text style={styles.name}>{state.user.firstName} {state.user.lastName}</Text>
            <Text style={styles.description}>{state.user.role}</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut}>
            <View  style={styles.iconContainer}>
              <Ionicons name={'log-out-outline'} size={wp(20)} color={colors.secondaryDarker} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            Exam Centers In System
          </Text>
          <Text style={styles.infoValue}>
            {centersNumber}
          </Text>
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Actions</Text>
        </View>
        <View style={styles.content}>
          <ActionCards
            marginTop={hp(25)}
            onPress={() => navigation.navigate('AdminList')}
            title={'Admins'}
            iconName={'people-outline'}
            value={adminNumber}
          />
          <ActionCards
            // color={colors.secondaryDarker}
            marginTop={hp(25)}
            onPress={() => navigation.navigate('AdminCenters')}
            title={'Centers'}
            iconName={'location-outline'}
            value={centersNumber}
          />
          <ActionCards
            // color={colors.secondaryDarker}
            width={wp(335)}
            marginTop={hp(25)}
            onPress={() => navigation.navigate('AdminBlocks')}
            title={'Blocks / Building'}
            iconName={'business-outline'}
            value={blocksNumber}
          />
          {/* <ActionCards
            color={generateColor()}
            marginTop={hp(25)}
            title={'Payments'}
            value={40}
          /> */}
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
  name: {
    fontSize: wp(20),
    fontWeight: '500',
    color: colors.primary
  },
  description: {
    fontSize: wp(16),
    textTransform: 'capitalize',
    fontWeight: '300',
    color: colors.secondaryDarker
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
    marginTop: hp(20),
    paddingVertical: hp(22),
    borderRadius: wp(10),
    backgroundColor: colors.primary + 20,
  },
  infoTitle: {
    fontSize: wp(16),
    fontWeight: '300',
    color: colors.primary,
  },
  infoValue: {
    fontSize: wp(35),
    fontWeight: '700',
    marginTop: hp(10),
    color: colors.primary
  },
  sectionTitleContainer: {
    marginTop: hp(25),
  },
  sectionTitle: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.primary
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: hp(20)
  }
})

export default AdminHome;