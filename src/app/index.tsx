import { Input } from "@/components/input";
import { View, Image, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Button } from "@/components/button";

export default function Home() {
	return (
		<View className="flex-1 bg-green-500 items-center justify-center p-8">
			<StatusBar barStyle={"light-content"} />

			<Image
				source={require("@/assets/logo.png")}
				className="h-16"
				resizeMode="contain"
			/>

			<View className="w-full mt-12 gap-3">
				<Input>
					<MaterialCommunityIcons
						name="ticket-confirmation-outline"
						size={20}
						color="white"
					/>
					<Input.Field placeholder="Email" />
				</Input>

				<Button title="Acessar credencial" />

				<Link
					href="/register"
					className="text-gray-100 text-base font-bold text-center mt-8">
					Ainda não possui ingresso?
				</Link>
			</View>
		</View>
	);
}
