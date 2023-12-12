import { useEffect, useState } from "react";
import { useTheme } from "native-base";
import OneSignal, { NotificationReceivedEvent, OSNotification } from "react-native-onesignal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Notification } from "../components/Notification";

import { AppRoutes } from "./app.routes";

export function Routes() {
	const [notificacao, defNotificacao] = useState<OSNotification>();
	const { colors } = useTheme();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[700];

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
		<NavigationContainer theme={theme}>
			<AppRoutes />
			{notificacao?.title && (
				<Notification dados={notificacao} onClose={() => defNotificacao(undefined)} />
			)}
		</NavigationContainer>
	);
}
