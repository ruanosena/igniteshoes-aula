import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import OneSignal from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";

import { tagUserInfoCreate } from "./src/notifications/notificationTags";

OneSignal.setAppId("23a22fbc-2cb9-437d-8dcf-ef1f63b2b8da");

// OneSignal.sendTag("user_email", "ruan@email.com");

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	tagUserInfoCreate();

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<CartContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</CartContextProvider>
		</NativeBaseProvider>
	);
}
