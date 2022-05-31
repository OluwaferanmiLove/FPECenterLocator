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

function AdminAddPastQuestion({ navigation, route }) {
  const [showCamera, setShowCamera] = useState(false);
  const { state } = useContext(AppContext);

  const paystackWebViewRef = useRef();

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Add Book'} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <ImageView
          borderRadius={wp(8)}
          width={'100%'}
          onPressUpload={() => setShowCamera(true)}
          // image={detail.imageLink}
          height={hp(450)}
        />
          <View style={{ marginTop: hp(15), flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Input
                label={'Title'}
                placeholder={'Enter title'}/>
              <Input
                label={'Author'}
                placeholder={'Enter author'}
                marginTop={hp(20)} />
              <Input
                label={'Price'}
                placeholder={'Enter price'}
                marginTop={hp(20)} />
            </View>
          </View>
          {/* <View style={styles.roleContainer}>
          <Text style={styles.description}>{detail.language}</Text>
        </View> */}
          <View style={{ marginTop: hp(25) }}>
            <Button
              title={'Add book'}
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
    marginTop: hp(20),
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

export default AdminAddPastQuestion;