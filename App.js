import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppContextProvider from './src/context/AppContext';
import FPECenterLocator from './src/navigation';
import { initializeApp } from "firebase/app";
import { ToastProvider } from 'react-native-toast-notifications';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { hp } from './src/util/dimension';

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBBT5skZdG35UNeB8LmGaH5gWoz2mFR0LQ",
    authDomain: "fpecenterlocator.firebaseapp.com",
    projectId: "fpecenterlocator",
    storageBucket: "fpecenterlocator.appspot.com",
    messagingSenderId: "482927470519",
    appId: "1:482927470519:web:4fc90d359adf48b202aa32"
  };

  initializeApp(firebaseConfig);

  return (
    <AppContextProvider>
      <ToastProvider
        placement="top"
        duration={2000}
        // successColor="green"
        // dangerColor="red"
        // warningColor="orange"
        // normalColor="#6610F2"
        normalColor={Colors.primary}
        offsetTop={hp(40)}
        // renderType={{
        //   normal: (toast) => (
        //     <Toast text={toast.message} bgColor="#6610F2" />
        //   ),
        //   danger: (toast) => (
        //     <Toast text={toast.message} bgColor="#F83C33" />
        //   ),
        //   success: (toast) => (
        //     <Toast text={toast.message} bgColor="#45D988" />
        //   ),
        // }}
        swipeEnabled={true}>
        <FPECenterLocator />
      </ToastProvider>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
