import { NavLink } from "react-router-dom";

import "./styles.scss";

const LayoutHeader = () => {
  return (
    <header className="w-full bg-white flex flex-col py-2 lg:py-0 relative z-10">
      <div className="container max-w-[1320px] mx-auto">
        <div className="w-full h-[0] px-2 flex justify-center">
          <img
            src="/images/palladium-logo.png"
            className="w-[320px] h-[137px] object-contain bg-white"
            alt="company logo"
          />
        </div>
        <div className="w-full px-2 hidden lg:flex justify-end">
          <div className="bg-[#FBC332] p-[5px] cursor-pointer">TR</div>
          <div className="p-[5px] cursor-pointer">EN</div>
          <div className="p-[5px] cursor-pointer">AZ</div>
        </div>
        <div className="w-full flex flex-col items-center mx-auto">
          <div className="flex lg:hidden items-center justify-end w-full h-full">
            <button className="text-[1.25rem] rounded border border-[rgba(0,0,0,.1)] text-[rgba(0,0,0,.55)] py-[.25rem] px-[.75rem]">
              <img src="/images/bars.svg" className="w-[30px] h-[30px]" />
            </button>
          </div>
          <div className="w-full hidden lg:flex flex-col lg:flex-row nav-content py-[0.5rem] h-[54.5px]">
            <div className="h-full flex lg:flex-row flex-col items-center lg:justify-center">
              <NavLink to="/" className="px-[0.5rem] w-max">
                Kurumsal
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                Üretim
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                Ar-Ge
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                Teknoloji
              </NavLink>
            </div>
            <div className="w-full flex justify-center"></div>
            <div className="h-full flex lg:flex-row flex-col items-center lg:justify-center">
              <NavLink to="/" className="px-[0.5rem] w-max">
                İştiraklerimiz
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                Sürdürebilirlik
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                İ.K.
              </NavLink>
              <NavLink to="/" className="px-[0.5rem] w-max">
                İletişim
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
