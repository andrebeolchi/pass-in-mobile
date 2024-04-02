import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { QRCode } from "@/components/qrcode";
import { colors } from "@/styles/colors";

export default function Ticket() {
	const [image, setImage] = useState<string>("");
	const [expandQRCode, setExpandQRCode] = useState<boolean>(false);

	async function handleSelectImage() {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 4],
			});

			if (result.assets) {
				setImage(result.assets[0].uri);
			}
		} catch (error) {
			console.log(error);
			Alert.alert("Foto", "Não foi possível selecionar a imagem.");
		}
	}

	return (
		<View className="flex-1 bg-green-500">
			<StatusBar barStyle={"light-content"} />

			<Header title="Minha Credencial" />

			<ScrollView
				className="-mt-28 -z-10"
				contentContainerClassName="px-8 pb-8"
				showsVerticalScrollIndicator={false}>
				<Credential
					onChangeAvatar={handleSelectImage}
					image={image}
					onExpandQRCode={() => setExpandQRCode(true)}
				/>

				<FontAwesome
					name="angle-double-down"
					size={24}
					color={colors.gray[300]}
					className="self-center my-6"
				/>
				<Text className="text-white font-bold text-2xl mt-4">Compartilhar Credencial</Text>
				<Text className="text-white font-regular text-base mt-1 mb-6">
					Mostre ao mundo que você vai participar do Unite Summit!
				</Text>
				<Button title="Compartilhar" />
				<View className="mt-10">
					<TouchableOpacity activeOpacity={0.8}>
						<Text className="text-base text-white text-bold text-center">Remover Ingresso</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<Modal
				visible={expandQRCode}
				statusBarTranslucent>
				<View className="flex-1 bg-green-500 items-center justify-center">
					<QRCode
						value="https://unitesummit.com.br/andre"
						size={240}
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setExpandQRCode(false)}>
						<Text className="font-body text-orange-500 text-sm mt-10">Fechar</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<SafeAreaView />
		</View>
	);
}
