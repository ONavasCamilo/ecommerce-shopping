import style from "./Menu.module.css";

const Menu = () => {

  return (
    <div className={style.menu_cont}>
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
    </div>
  );
};

export default Menu;
