import React, { forwardRef } from "react";
import { useController } from "react-hook-form";
const RadioHook = forwardRef(function Radio({ control, ...props }, ref) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: false,
  });
  return (
    <label className="cursor-pointer custom-radio">
      <input
        type="radio"
        {...field}
        ref={ref}
        {...props}
        className="hidden"
        defaultChecked={props.defaultChecked}
      />
      <div className="w-full h-full bg-white rounded-full"></div>
    </label>
  );
});
export default RadioHook;
