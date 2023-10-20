import React from "react";
import { useForm, useWatch } from "react-hook-form";
import InputHook from "../Input/InputHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RadioHook from "../Radio/RadioHook";
import CheckBoxHook from "../CheckBox/CheckBoxHook";
import DropDown from "../DropDown/DropDown";
const schema = yup
  .object({
    userName: yup.string().required("Please enter your username"),
    passWord: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        {
          message:
            "Your password must have least 10 characters or more than, at least one uppercase letter, one lowercase letter, one number and one special characte",
        }
      )
      .min(10, "Your password must have at least 10 characters or more than")
      .required("Please enter your password"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    gender: yup
      .string()
      .required("Please select your gender")
      .oneOf(["male", "female"], "You can only choose male or female"),
    job: yup
      .string()
      .required("Please enter your job")
      .oneOf(["Teacher", "Doctor", "Developer", "Artist"]),
    term: yup
      .boolean()
      .required("Please checked your terms and condition before submit"),
  })
  .required();
const dropdownData = [
  {
    id: 1,
    value: "Teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "Developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "Doctor",
    text: "Doctor",
  },
  {
    id: 4,
    value: "Artist",
    text: "Artist",
  },
];
const FormHook = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmit = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          term: false,
        });
        console.log(values);
      }, 5000);
    });
  };
  console.log(isSubmitting);
  return (
    <div className="max-w-[300px] mx-auto">
      <form
        action=""
        className="w-full"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-2 gap-y-2">
          <label
            htmlFor="userName"
            className="text-sm text-[#000] font-medium cursor-pointer"
          >
            Username
          </label>
          <InputHook
            name="userName"
            id="userName"
            placeholder="Enter your username"
            {...register("userName")}
            control={control}
          ></InputHook>
          {errors?.userName && (
            <p className="text-sm text-red-500">{errors?.userName?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 gap-y-2">
          <label
            htmlFor="passWord"
            className="text-sm text-[#000] font-medium cursor-pointer"
          >
            Password
          </label>
          <InputHook
            name="passWord"
            id="passWord"
            placeholder="Enter your username"
            {...register("passWord")}
            control={control}
            type="password"
          ></InputHook>
          {errors?.passWord && (
            <p className="text-sm text-red-500">{errors?.passWord?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 gap-y-2">
          <label
            htmlFor="email"
            className="text-sm text-[#000] font-medium cursor-pointer"
          >
            Email
          </label>
          <InputHook
            name="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
            control={control}
            type="email"
          ></InputHook>
          {errors?.email && (
            <p className="text-sm text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 gap-y-2">
          <label
            htmlFor="gender"
            className="text-sm text-[#000] font-medium cursor-pointer"
          >
            Gender
          </label>
          <div className="flex items-center gap-x-2">
            <RadioHook
              control={control}
              name="gender"
              value="male"
              defaultChecked={true}
            ></RadioHook>
            <span>Male</span>
            <RadioHook
              control={control}
              name="gender"
              value="female"
            ></RadioHook>
            <span>Female</span>
          </div>
          {errors?.gender && (
            <p className="text-sm text-red-500">{errors?.gender?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 gap-y-2">
          <label
            htmlFor=""
            className="text-sm text-[#000] font-medium cursor-pointer"
          >
            Are you
          </label>
          <DropDown
            control={control}
            setValue={setValue}
            {...register("job")}
            data={dropdownData}
            dropdownLabel="Select your job"
          ></DropDown>
          {errors?.job && (
            <p className="text-sm text-red-500">{errors?.job?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <CheckBoxHook
            control={control}
            text="I accept the terms and conditions"
            name="term"
          ></CheckBoxHook>
          {errors.term && (
            <p className="text-sm text-red-500">{errors.term.message}</p>
          )}
        </div>

        <div className="flex gap-x-3">
          <button
            type="submit"
            className={`bg-blue-500 w-full rounded-lg text-white mt-3 text-base font-bold px-[120px] py-3 ${
              isSubmitting ? "opacity-50" : ""
            } `}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormHook;
