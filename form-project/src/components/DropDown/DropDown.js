import React, { forwardRef, useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useWatch } from "react-hook-form";

// const data = [
//   {
//     id: 1,
//     value: "Teacher",
//     text: "Teacher",
//   },
//   {
//     id: 2,
//     value: "Developer",
//     text: "Developer",
//   },
//   {
//     id: 3,
//     value: "Doctor",
//     text: "Doctor",
//   },
//   {
//     id: 4,
//     value: "Artist",
//     text: "Artist",
//   },
// ];
const DropDown = forwardRef(function (
  { control, setValue, name, data, dropdownLabel = "Select your job" },
  ref
) {
  const { nodeRef, show, setShow } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  const handleClick = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);
  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="relative flex items-center w-full" ref={nodeRef}>
      <div
        className="flex items-center justify-between w-full p-5 bg-white border border-gray-100 rounded-lg cursor-pointer"
        onClick={() => setShow(!show)}
        ref={ref}
      >
        <span>{label}</span>
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999999 1L4.16795 5.75193C4.56377 6.34566 5.43623 6.34566 5.83205 5.75192L9 1"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="0.2 0.2"
          />
        </svg>
      </div>
      {show && (
        <div className="absolute left-0 right-0 w-full bg-white rounded-lg top-full">
          {data.map((item) => (
            <div
              className="p-5 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={handleClick}
              data-value={item.value}
              key={item.id}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default DropDown;
