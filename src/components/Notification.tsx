import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OSNotification } from "react-native-onesignal";

type Props = {
	dados: OSNotification;
	onClose: () => void;
};

type DadosAdicionaisProps = {
	route?: "details";
	product_id?: string;
};

export function Notification({ dados, onClose }: Props) {
	const { navigate: navegar } = useNavigation();

	function lidarPressionar() {
		const { route, product_id } = dados.additionalData as DadosAdicionaisProps;

		if (route == "details" && product_id) {
			navegar("details", { productId: product_id });
		}
		onClose();
	}

	return (
		<Pressable
			w="full"
			p={4}
			pt={12}
			bgColor="gray.200"
			position="absolute"
			top={0}
			onPress={lidarPressionar}
		>
			<HStack justifyContent="space-between" alignItems="center">
				<Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2} />

				<Text fontSize="md" color="black" flex={1}>
					{dados.title}
				</Text>

				<IconButton
					variant="unstyled"
					_focus={{ borderWidth: 0 }}
					icon={<CloseIcon size="3" />}
					_icon={{ color: "coolGray.600" }}
					color="black"
					onPress={onClose}
				/>
			</HStack>
		</Pressable>
	);
}
