import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import OneSignal from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";

import { tagUserInfoCreate } from "./src/notifications/notificationTags";
import { useEffect } from "react";

OneSignal.setAppId("23a22fbc-2cb9-437d-8dcf-ef1f63b2b8da");

// OneSignal.sendTag("user_email", "ruan@email.com");

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	tagUserInfoCreate();

	useEffect(() => {
		const desinscrever = OneSignal.setNotificationOpenedHandler((resposta) => {
			const { actionId } = resposta.action as any;

			switch (actionId) {
				case "1":
					return console.log("Ver todas");
				case "2":
					return console.log("Ver pedido");
				default:
					return console.log("Não clicou em botão de ação");
			}
		});
		return () => desinscrever;
	}, []);

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<CartContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</CartContextProvider>
		</NativeBaseProvider>
	);
}
