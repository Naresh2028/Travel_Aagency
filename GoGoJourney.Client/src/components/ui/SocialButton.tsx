import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type SocialButtonProps = {
    provider: 'google' | 'apple',
    label : string,
    onPress?: () => void,
    disabled?: boolean,
}

export const SocialButton = ({ provider, label, onPress, disabled }: SocialButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityLabel={label}
            disabled={disabled}
            onPress={onPress}>
                {provider === "google" ? (
                    <AntDesign name='google' size={22} color='#FFFFFF'/>
                ) : (
                    <FontAwesome name='apple' size={25} color='#FFFFFF'/>
                )}

                <Text style= {styles.label}>{label}</Text>
                <Text  style= {styles.arrow}>›</Text>
            </Pressable>
    );
}

const styles = StyleSheet.create({
  button: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    borderWidth: 1.25,
    borderColor: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    backgroundColor: "rgba(11,27,29,0.42)",
  },
  label: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
  },
  arrow: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 47,
    fontWeight: "200",
    lineHeight: 48,
  },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.55 },
});
