import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function CenterCard({
  color = colors.primary,
  image,
  marginTop,
  title,
  subTitle,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginTop}}>
      <View style={[styles.actionCard, {backgroundColor: color + '10'}]}>
        <Image
          source={image}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>
            {title}
          </Text>
          <Text style={[styles.subTitle]}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionCard: {
    justifyContent: 'flex-end',
    width: wp(160),
    height: wp(160),
    // borderRadius: wp(10),
    // borderWidth: wp(1),
    backgroundColor: colors.inputBg + '30',
    paddingTop: hp(10),
    // paddingHorizontal: hp(10),
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: wp(160),
    height: wp(160),
  },
  titleContainer: {
    backgroundColor: '#00000050',
    paddingHorizontal: wp(8),
    paddingVertical: hp(8)
  },
  title: {
    color: '#ffffff',
    fontSize: wp(20),
    fontWeight: '700',
  },
  subTitle: {
    color: '#ffffff',
    fontSize: wp(12),
  },
  valueContainer: {
    marginTop: hp(8),
    width: '100%',
    borderRadius: 9999,
    paddingVertical: hp(6),
    paddingHorizontal: hp(12),
    backgroundColor: '#ffffff',
  },
  value: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.primaryLighter
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'absolute',
    overflow: 'hidden',
  },
})

export default CenterCard;