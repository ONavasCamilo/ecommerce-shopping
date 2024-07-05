import iconMenu from "/iconMenu.svg";
import style from "./Header.module.css";
import iconLogo from "/iconLogo.svg";
import iconAccount from "/iconAccount.svg";
import iconCart from "/iconCart.svg";

const Header = () => {
  return (
    <div className={style.div__navbar}>
        <img src={iconMenu} className={style.icon__menu} />
        <img src={iconLogo} className={style.icon__logo} />
        <img src={iconAccount} className={style.icon__account} />
        {/* <span>Cuenta</span> */}
        <img src={iconCart} className={style.icon__cart} />
    </div>
  );
};

export default Header;
