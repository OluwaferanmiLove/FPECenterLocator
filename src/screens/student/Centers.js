import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import CourseCard from '../../components/CourseCard';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

function Centers({ navigation }) {
  const [centers, setCenters] = useState([]);
  const [addAdminModal, setAddAdminModal] = useState(false);

  const db = getFirestore();

  const centersRef = collection(db, 'centers');

  useEffect(() => {
    const getCenters = async () => {
      let centers = await getDocs(centersRef);
      let allCenters = centers.docs.map((item) => {
        return item.data();
      });
      
      setCenters(allCenters);
      console.log(allCenters);
    }
  
    getCenters();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Centers'} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        {centers.map((item, index) => (
          <CourseCard
            key={item.centerName}
            title={item.centerName}
            subTitle={item.value.blockName}
            onPress={() => navigation.navigate('Direction', item.value)}
          />
        ))}
      </ScrollView>
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
  name: {
    fontSize: hp(20),
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
    fontSize: hp(16),
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

export default Centers;