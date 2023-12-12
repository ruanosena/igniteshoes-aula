import { useEffect, useState } from "react";
import { useTheme } from "native-base";
import OneSignal, { NotificationReceivedEvent, OSNotification } from "react-native-onesignal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";

const linking = {
	prefixes: ["igniteshoesapp://", "io.github.ruanosena.igniteshoes://", "exp+igniteshoesapp://"],
	config: {
		screens: {
			details: {
				path: "details/:productId",
				parse: {
					productId: (productId: string) => productId,
				},
			},
		},
	},
};

export function Routes() {
	const [notificacao, defNotificacao] = useState<OSNotification>();
	const { colors } = useTheme();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[700];

	const deepLinking = Linking.createURL("details", {
		queryParams: {
			productId: "7",
		},
	});

  console.log(deepLinking);

	useEffect(() => {
		const desinscrever = OneSignal.setNotificationWillShowInForegroundHandler(
			(notificacaoEvento: NotificationReceivedEvent) => {
				const resposta = notificacaoEvento.getNotification();

				defNotificacao(resposta);
			}
		);
		return () => desinscrever;
	}, []);

	return (
		<NavigationContainer theme={theme} linking={linking}>
			<AppRoutes />
			{notificacao?.title && (
				<Notification dados={notificacao} onClose={() => defNotificacao(undefined)} />
			)}
		</NavigationContainer>
	);
}
