import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/styles/colors";
import { QRCode } from "./qrcode";

type Props = {
	image?: string;
	onChangeAvatar?: () => void;
	onExpandQRCode?: () => void;
};

export function Credential({ onChangeAvatar, image, onExpandQRCode }: Props) {
	return (
		<View className="w-full self-stretch items-center">
			<Image
				source={require("@/assets/ticket/band.png")}
				className="w-24 h-52 z-10"
			/>

			<View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
				<ImageBackground
					source={require("@/assets/ticket/header.png")}
					className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden">
					<View className="w-full flex-row items-center justify-between">
						<Text className="text-zinc-50 text-sm font-bold">Unite Summit</Text>
						<Text className="text-zinc-50 text-sm font-bold">#123</Text>
					</View>

					<View className="h-40 w-40 bg-black rounded-full" />
				</ImageBackground>

				{image ? (
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={onChangeAvatar}>
						<Image
							source={{ uri: image }}
							className="w-36 h-36 rounded-full -mt-24"
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={onChangeAvatar}>
						<View className="w-36 h-36 rounded-full bg-gray-400 -mt-24 items-center justify-center">
							<Feather
								name="camera"
								color={colors.green[400]}
								size={32}
							/>
						</View>
					</TouchableOpacity>
				)}

				<Text className="font-bold text-2xl text-zinc-50 mt-4">André Beolchi</Text>
				<Text className="font-regular text-base text-zinc-300 mb-4">andre@email.com</Text>

				<View className="mb-4">
					<QRCode
						value="https://unitesummit.com.br/andre"
						size={120}
					/>
				</View>

				<TouchableOpacity
					activeOpacity={0.8}
					onPress={onExpandQRCode}>
					<Text className="font-body text-orange-500 text-sm">Ampliar QRCode</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
