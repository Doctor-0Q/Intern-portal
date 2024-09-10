import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-auto md:h-[196px] bg-[#0080FF] text-center text-[#FFFFFF] p-4 md:p-0">
      <p className="font-source-sans text-[14px] md:text-[18px] font-semibold leading-[20px] md:leading-[26.4px] m-0 py-2.5">
        A new system to showcase your performance every week. It's a fantastic
        opportunity to celebrate your hard work and keep our momentum strong.
        Make sure to join every meeting,
        <br className="hidden md:block" /> respond promptly, and complete
        mandatory tasks to keep our performance at its peak. "Together, let's
        aim for excellence!"
      </p>
      <div>
        <h3 className="font-source-sans text-[16px] md:text-[21px] font-semibold leading-[24px] md:leading-[32.68px] m-0 py-2.5">
          © 2024 DOC-Q INTERN PORTAL. All rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Footer;
