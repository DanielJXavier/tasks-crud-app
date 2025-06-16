import { FC, PropsWithChildren } from "react";

export const FormButton: FC<PropsWithChildren> = ({ children }) => (
  <button className="py-2 bg-[#141516] text-white rounded-lg cursor-pointer shadow-md hover:shadow-none">
    {children}
  </button>
);
