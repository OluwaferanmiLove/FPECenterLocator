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
import AddAdminModal from './components/AddAdminModal';

function StudentList({navigation}) {
  const [addAdminModal, setAddAdminModal] = useState(false)
  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Admin List'} onPress={() => navigation.goBack()} />
      <View style={styles.searchContainer}>
        <Input height={hp(48)} placeholder={'Search the list'} />
      </View>
      <ScrollView style={styles.content}>
        {users.map((item, index) => (
          <Userlist
            key={item.id}
            onPress={() => navigation.navigate('Profile')}
            image={{ uri: item.image }}
            name={item.name}
            description={item.role} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button dark title={'Add new admin'} onPress={() => setAddAdminModal(true)} />
      </View>
      <AddAdminModal isVisible={addAdminModal} onPressCancel={() => setAddAdminModal(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  searchContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(20),
  },
  content: {
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  buttonContainer: {
    // position: 'absolute',
    paddingHorizontal: wp(20),
    paddingTop: hp(10),
    marginBottom: hp(25),
  },
})

export default StudentList;