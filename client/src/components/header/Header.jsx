import iconMenu from "/iconMenu.svg";
import style from "./Header.module.css";
import iconLogo from "/iconLogo.svg";
import iconAccount from "/iconAccount.svg";
import iconCart from "/iconCart.svg";
import iconCloseX from "/iconCloseX.svg";
import { useState } from "react";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <header className={style.header__navbar}>
      <div className={style.div__navbar}>
        {isOpenMenu ? (
          <img
            src={iconCloseX}
            onClick={toggleMenu}
            className={style.icon__menu}
          />
        ) : (
          <img
            src={iconMenu}
            onClick={toggleMenu}
            className={style.icon__menu}
          />
        )}
        <NavLink to="/">
          <img src={iconLogo} className={style.icon__logo} />
        </NavLink>
        <div className={style.icon__div_account}>
          <NavLink to="/">
            <img src={iconAccount} className={style.icon__account}/>
            {/* <span>Cuenta</span> */}
          </NavLink>
        </div>
        <div className={style.icon__div_cart} >
          <img src={iconCart} className={style.icon__cart}/>
          {/* <span>Carrito</span> */}
        </div>
      </div>
      <Menu isOpenMenu={isOpenMenu} />
    </header>
  );
};

export default Header;
