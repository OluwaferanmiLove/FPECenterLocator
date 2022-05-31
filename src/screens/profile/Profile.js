import React, { useState, useContext } from 'react';
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
import { AppContext } from '../../context/AppContext';
import { deleteFromStorage } from '../../util/storageUtil';
import { logout } from '../../context/action';

function Profile({ navigation }) {
  const [addAdminModal, setAddAdminModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const handleLogOut = () => {
    deleteFromStorage('userData')
      .then((response) => {
        dispatch(logout())
        // dispatch(resetState())
      })
  }

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Profile'} onPress={state.user.role === 'admin' ? () => navigation.goBack() : null} />
      <View style={styles.content}>
        {/* <ImageView width={wp(150)} height={wp(150)} /> */}
        <View style={{ marginTop: hp(10) }}>
          <Text style={styles.name}>{state.user.firstName} {state.user.lastName}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginHorizontal: wp(20) }}>
          <View style={styles.roleContainer}>
            <Text style={styles.description}>{state.user.role}</Text>
          </View>
          {state.user.role === 'student' && (
            <>
              <View style={styles.roleContainer}>
                <Text style={[styles.description, { textTransform: 'uppercase' }]}>{state.user.level}</Text>
              </View>
              <View style={styles.roleContainer}>
                <Text style={[styles.description, { textTransform: 'uppercase' }]}>{state.user.matricNumber}</Text>
              </View>
            </>
          )}
        </View>
        <View style={{ marginTop: hp(30) }}>
          <Text style={styles.name}>Actions</Text>
        </View>
        <View style={styles.actionContainer}>
          {/* <ActionCard color={'#cc5500'} title={'Block User'} /> */}
          {/* <ActionCard color={'#ee7600'} title={'Block User'} />
          <ActionCard color={'#bb0a1e'} title={'Delete User'} /> */}
          <ActionCard
            color={'#092e20'}
            title={'Log out'}
            onPress={handleLogOut}
            // marginTop={hp(20)}
            width={wp(335)} />
          {/* <ActionCard color={'#bb0a1e'} title={'Delete User'} marginTop={hp(20)} /> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  content: {
    alignItems: 'center',
    marginTop: hp(20),
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
    textTransform: 'capitalize',
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

export default Profile;