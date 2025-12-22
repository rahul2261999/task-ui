import React from "react";

const actionItems = [
  { label: "Vital" },
  { label: "Edit" },
  { label: "Delete" },
  { label: "Finish" },
];

export const Actions = (): JSX.Element => {
  return (
    <nav className="bg-white w-full min-w-[49px] min-h-[95px] flex items-center justify-center">
      <ul className="mt-0.5 h-[79px] w-[39px] flex flex-col gap-[5px]">
        {actionItems.map((item, index) => (
          <li key={index} className="h-4 flex">
            <button className="flex-1 [font-family:'Inter',Helvetica] font-normal text-black text-[10px] tracking-[0] leading-[normal] whitespace-nowrap text-left">
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
