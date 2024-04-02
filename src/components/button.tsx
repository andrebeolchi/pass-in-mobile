import { ActivityIndicator, TouchableOpacityProps, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = TouchableOpacityProps & {
	title: string;
	isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			disabled={isLoading}
			activeOpacity={0.7}
			{...rest}>
			<View className="w-full bg-orange-500 h-14 items-center justify-center rounded-lg">
				{isLoading ? (
					<ActivityIndicator className="text-green-500" />
				) : (
					<Text className="text-base font-bold uppercase">{title}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
}
