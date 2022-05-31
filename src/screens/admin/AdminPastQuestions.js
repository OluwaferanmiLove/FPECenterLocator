import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import Input from '../../components/Input';
import HeaderLite from '../../components/HeaderLite';
import Userlist from '../../components/Userlist';
import { users } from '../../constants/mockData';
import Button from '../../components/Button';
import ImageView from '../../components/ImageView';
import ActionCard from '../../components/ActionCard';
import CourseCard from '../../components/CourseCard';

function AdminPastQuestions({navigation}) {
  const [addAdminModal, setAddAdminModal] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Past Questions'} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </ScrollView>
      <TouchableOpacity style={styles.fabContainer} onPress={() => navigation.navigate('AdminAddPastQuestion')}>
        <Ionicons name={'add-circle'} size={wp(65)} color={colors.primary} />
      </TouchableOpacity>
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
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  name: {
    fontSize: hp(20),
    fontWeight: '700',
    color: colors.primary,
  },
  fabContainer: {
    position: 'absolute',
    bottom: hp(50),
    right: wp(20)
  },
})

export default AdminPastQuestions;