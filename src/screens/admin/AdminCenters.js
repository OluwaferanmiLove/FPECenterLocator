import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import CourseCard from '../../components/CourseCard';
import Button from '../../components/Button';
import { doc, getDocs, getFirestore, collection, getDoc, setDoc } from 'firebase/firestore';
import Modal from 'react-native-modal';
import Input from '../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppContext } from '../../context/AppContext';
import { useToast } from 'react-native-toast-notifications';

function AdminCenters({ navigation }) {
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [showAddCenter, setShowAddCenter] = useState(false);
  const [centerName, setCenterName] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { state, dispatch } = useContext(AppContext);

  const toast = useToast();

  const db = getFirestore();

  const blocksRef = collection(db, 'blocks');
  const centersRef = collection(db, 'centers');

  useEffect(() => {
    const getCenters = async () => {
      let centers = await getDocs(centersRef);
      let allCenters = centers.docs.map((item) => {
        return item.data();
      })
      setCenters(allCenters);
      console.log(allCenters);
    }
  
    getCenters();
  }, []);

  useEffect(() => {
    const getBlocks = async () => {
      let blocks = await getDocs(blocksRef);
      let allBlocks = blocks.docs.map((item) => {
        return {value: item.data(), label: item.data().blockName};
      })
      setBlocks(allBlocks)
      // console.log(allBlocks)
    }
  
    getBlocks();
  }, [])

  const handleAddCenter = async () => {
    setLoading(true);
    try {
      const newCenterRef = doc(db, 'centers', centerName);
  
        // set user data in firestore
        let newCenterInfo = await setDoc(newCenterRef, {centerName, value});
        console.log(newCenterInfo);
        toast.show('Center added successfull');
        setLoading(false)
    } catch (e) {
        setLoading(false)
        console.log(e)
    }
  }

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
      <View style={styles.floatingBtn}>
        <Button
          dark
          onPress={() => setShowAddCenter(true)}
          title={'Add new center'}
        />
      </View>
      <Modal
        isVisible={showAddCenter}
        coverScreen={false}
        hasBackdrop={true}
        backdropOpacity={0.5}
        swipeDirection={'down'}
        onSwipeComplete={() => setShowAddCenter(false)}
        onBackdropPress={() => setShowAddCenter(false)}
        animationIn={'fadeIn'}
        style={{
          // width: '100%',
          // bottom: 0,
          margin: 0,
          height: '100%',
          justifyContent: 'flex-end',
          // backgroundColor: colors.mainBg,

        }}>
        <View style={{
          marginTop: hp(15),
          // flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: hp(30),
          borderTopRightRadius: wp(15),
          borderTopLeftRadius: wp(15),
          backgroundColor: colors.white,
        }}>
          <View style={{marginHorizontal: wp(20)}}>
            <Input
              label={'Center name'}
              onChangeText={(value) => setCenterName(value)}
              placeholder={'Enter block name'} />
            {/* <Input
              label={'Description'}
              placeholder={'Enter description'}
              onChangeText={(value) => handleTextChange('description', value)}
              marginTop={hp(20)} /> */}
              <View style={{width: '100%', marginTop: hp(20)}}>
                <View>
                  <Text style={styles.selectLabel}>select Block</Text>
                </View>
                <View style={{width: '100%', marginTop: hp(20)}}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={blocks}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setBlocks}
                  />
                </View>
              </View>
              <Button
                dark
                onPress={handleAddCenter}
                loading={loading}
                title={'Add Center'}
                marginTop={hp(25)}
              />
          </View>
        </View>
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
  selectLabel: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: '#000000',
  },
  floatingBtn: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(50),
  },
})

export default AdminCenters;