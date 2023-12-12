import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
	OneSignal.sendTags({
		usuario_nome: "Ruan",
		usuario_email: "ruan@email.com",
	});
	OneSignal.deleteTags(["user_name", "user_email"]);
}
