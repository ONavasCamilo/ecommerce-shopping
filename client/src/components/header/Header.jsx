import iconMenu from "/iconMenu.svg";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.div__navbar}>
      <img src={iconMenu} className={style.icon__menu}/>
      <h1>SHOPPYSTYLE</h1>
      <h2>a</h2>
      <h2 className={style.icon__account}>cc</h2>
      <h2 className={style.icon__cart}>r</h2>
      {/* <img src={iconLogo} /> */}
      {/* <img src={iconAccount} className={style.icon__account}/> */}
      {/* <img src={iconCart}  className={style.icon__cart}/> */}
    </div>
  );
};

export default Header;
