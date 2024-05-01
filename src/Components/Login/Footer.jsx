import styles from "../style";
import logo from "../../assets/favicon.ico.png";

const Footer = () => (
  <footer
    className={`${styles.flexCenter} ${styles.paddingY} flex-col font-semibold dark:bg-slate-900 bg-gradient-to-l from-indigo-500 mt-10`}
  >
    <div className={`${styles.flexStart} md:flex-row flex-col w-full`}>
      <div className="flex-[1] flex flex-row justify-between items-center sm:px-5">
        <img
          src={logo}
          alt="sbg"
          className="w-[120px] h-[35px] object-contain"
        />
        <p className="font-poppins text-center text-[16px]">
          Copyright Ⓒ 2024. All Rights Reserved.
        </p>
        <p className={`max-w-[312px]`} dir="rtl">
          إدارة الخدمات المساندة للموارد البشرية
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
