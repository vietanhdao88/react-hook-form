import React, { forwardRef } from "react";
import { useController } from "react-hook-form";
const InputHook = forwardRef(function Input({ control, ...props }, ref) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      type="text"
      {...field}
      {...props}
      ref={ref}
      className=" bg-white border-2 border-gray-100 rounded text-[#999] text-sm p-4 outline-none transition-all focus:border-blue-500"
    />
  );
});
export default InputHook;
