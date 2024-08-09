import style from "./Menu.module.css";

const Menu = ({ isOpenMenu }) => {

  return (
    <div className={ isOpenMenu ? style.menu_cont : style.hide }>
      <div className={style.menu__div}>
        <p className={style.p__strong}>Home</p>
        <div>
          <p>SUDADERAS</p>
          <p>CAMISETAS</p>
          <p>ACCESORIOS</p>
        </div>
        <div>
          <p className={style.p__strong}>Carrito</p>
          <p className={style.p__strong}>Login</p>
          <p className={style.p__strong}>Registrarse</p>
        </div>
      </div>
      <div className={style.background__openMenu}></div>
    </div>
  );
};

export default Menu;
