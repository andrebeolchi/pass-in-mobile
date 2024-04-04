import { Input } from "@/components/input";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Alert, Image, StatusBar, View } from "react-native";

import { Button } from "@/components/button";
import { useState } from "react";
import { api } from "@/server/api";
import axios from "axios";
import { useBadgeStore } from "@/store/badge-store";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const badgeStore = useBadgeStore();

	async function handleRegister() {
		try {
			if (!name.trim() || !email.trim()) {
				return Alert.alert("Inscrição", "Preencha todos os campos");
			}

			setIsLoading(true);

			const { data } = await api.post(`/events/${EVENT_ID}/attendees`, {
				name,
				email,
			})

			if (data.attendeeId) {
				const { data: badgeData } = await api.get(`/attendees/${data.attendeeId}/badge`);

				if (badgeData) {
					badgeStore.save({ ...badgeData.badge, id: data.attendeeId });
				}

				Alert.alert("Inscrição", "Inscrição realizada com sucesso", [
					{
						text: "Ok",
						onPress: () => router.push("/ticket"),
					},
				]);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);

			if (axios.isAxiosError(error)) {
				if (String(error.response?.data?.message).includes("already registered")) {
					return Alert.alert("Inscrição", "Este e-mail já está inscrito no evento");
				}
			}

			Alert.alert("Inscrição", "Erro ao realizar inscrição");
		}
	}

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
					<FontAwesome6
						name="user-circle"
						size={20}
						color="white"
					/>
					<Input.Field
						placeholder="Nome completo"
						onChangeText={setName}
					/>
				</Input>

				<Input>
					<MaterialIcons
						name="alternate-email"
						size={20}
						color="white"
					/>
					<Input.Field
						placeholder="E-mail"
						keyboardType="email-address"
						autoCapitalize="none"
						onChangeText={setEmail}
					/>
				</Input>

				<Button
					title="Realizar inscrição"
					isLoading={isLoading}
					onPress={handleRegister}
				/>

				<Link
					href="/"
					className="text-gray-100 text-base font-bold text-center mt-8 bg-transparent">
					Já possui ingresso?
				</Link>
			</View>
		</View>
	);
}
