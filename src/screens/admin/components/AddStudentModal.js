import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';

function AddStudentModal({ isVisible, onPressCancel }) {

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      hasBackdrop={true}
      backdropOpacity={0.5}
      swipeDirection={'down'}
      onSwipeComplete={onPressCancel}
      onBackdropPress={onPressCancel}
      animationIn="slideInUp"
      style={{
        // width: '100%',
        // bottom: 0,
        margin: 0,
        height: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: colors.mainBg,

      }}>
      <View style={styles.main}>
        <View style={{ marginTop: hp(20), alignItems: 'center', paddingHorizontal: wp(20) }}>
          <View style={{width: wp(120), height: hp(4), backgroundColor: '#eee', borderRadius: 999}} />
        </View>
        <View style={styles.header}>
          <View style={{ marginLeft: wp(15), marginTop: hp(25) }}>
            <Text style={styles.title}>Add new admin</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: hp(10) }}>
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png' }} style={styles.image} />
                <TouchableOpacity style={{
                  position: 'absolute',
                  backgroundColor: colors.primary + 30,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: wp(14), color: colors.primary }}> + Add picture</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: hp(25) }}>
              <View style={{ marginLeft: wp(20) }}>
                <Text style={styles.title}>Enter admin name</Text>
              </View>
              <View style={styles.content}>
                <Input placeholder={'Enter name'} marginTop={hp(15)} />
              </View>
            </View>
            <View style={[styles.content, { marginTop: hp(35), paddingBottom: hp(30) }]}>
              <Button dark title={'Add Admin'} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    height: hp(460),
    backgroundColor: '#ffffff',
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(375),
  },
  backBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(45),
    width: wp(45),
    borderRadius: 9999,
    backgroundColor: colors.secondary
  },
  title: {
    fontSize: hp(20),
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.secondaryDarker,
    marginTop: hp(4)
  },
  content: {
    alignItems: 'center',
    // marginTop: hp(20)
    // marginHorizontal: wp(20),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    backgroundColor: colors.primary + 20,
  },
  image: {
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
})

export default AddStudentModal;