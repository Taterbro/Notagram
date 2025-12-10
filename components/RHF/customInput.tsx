import { typography } from "@/constants/theme";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";

interface inputProps {
  control: Control<any>;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  isEmail?: boolean;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
}
export default function CustomInput({
  control,
  name,
  rules,
  label,
  placeholder,
  isPassword,
  isEmail,
  style,
  required,
}: inputProps) {
  const { colors } = useTheme() as any;
  const styles = returnStyles(colors);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <View style={style || {}}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required && "This field is required",

          minLength: isPassword
            ? {
                value: 8,
                message: "Passwords must be 8 characters or more",
              }
            : undefined,
          validate: isEmail
            ? (value) =>
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                  value
                ) || "Please enter a valid email address"
            : undefined,
          ...rules,
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder={placeholder || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={colors.textMuted}
                keyboardType={isEmail ? "email-address" : "default"}
                secureTextEntry={isPassword && !isPasswordVisible}
              />
              {isPassword && (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon fill={colors.text} style={{ width: 24 }} />
                  ) : (
                    <EyeIcon fill={colors.text} style={{ width: 24 }} />
                  )}
                </TouchableOpacity>
              )}
            </View>

            {error && <Text style={styles.errorText}>{error?.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const returnStyles = (colors: any) =>
  StyleSheet.create({
    mainWrapper: {
      gap: 8,
    },
    label: {
      color: colors.textSecondary,
      fontSize: typography.sm,
      marginBottom: 4,
    },
    errorText: {
      color: colors.error,
      fontSize: typography.sm,
    },
    textInput: {
      color: colors.text,
      fontSize: typography.md,
      width: "90%",
    },
    textInputWrapper: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 8,
      flexDirection: "row",
      overflow: "hidden",
      alignItems: "center",
      width: "100%",
    },
  });
