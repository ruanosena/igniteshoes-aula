import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
	OneSignal.sendTags({
		usuario_nome: "Ruan",
		usuario_email: "ruan@email.com",
	});
	OneSignal.deleteTags(["user_name", "user_email"]);
}

export function tagCartUpdate(itensCont: string) {
	OneSignal.sendTag("carrinho_itens_cont", itensCont);
}
