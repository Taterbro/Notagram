import CustomInput from "@/components/RHF/customInput";
import { forwardRef, useImperativeHandle } from "react";
import { useForm, useWatch } from "react-hook-form";
import { View } from "react-native";

export type PasswordFormRef = {
  submit: () => void;
};

const PasswordForm = forwardRef<PasswordFormRef>((props, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const newPassword = useWatch({ name: "newPassword", control: control });
  const confirmed = useWatch({ name: "confirmPassword", control: control });

  const onSubmit = () => {
    console.log("form submitted");
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));
  return (
    <View>
      <CustomInput
        required={true}
        isPassword={true}
        name="currentPassword"
        control={control}
        label="Current password"
      />
      <CustomInput
        required={true}
        name="newPassword"
        control={control}
        label="New Password"
        isPassword={true}
        rules={{
          validate: (value) =>
            value != confirmed ? "Passwords do not match" : undefined,
        }}
      />
      <CustomInput
        required={true}
        name="confirmPassword"
        control={control}
        label="Confirm New Password"
        isPassword={true}
        rules={{
          validate: (value) =>
            value != newPassword ? "Passwords do not match" : undefined,
        }}
      />
    </View>
  );
});

export default PasswordForm;
