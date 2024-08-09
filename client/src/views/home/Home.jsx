import style from "./Home.module.css";
import sudaderasHomeImg from "/sudaderasHomeImg.png";
import camisetasHomeImg from "/camisetasHomeImg.png";
import accesoriosHomeImg from "/accesoriosHomeImg.png";

const Home = () => {
  return (
    <main className={style.main__home}>
      <h1>SHOPPISTYLE</h1>
      <section className={style.section__home}>
        <img
          src={sudaderasHomeImg}
          alt="Sudaderas"
          className={style.img__home}
        />
        <h2>SUDADERAS</h2>
      </section>
      <section className={style.section__home}>
        <img src={camisetasHomeImg} alt="" className={style.img__home} />
        <h2>CAMISETAS</h2>
      </section>
      <section className={style.section__home}>
        <img src={accesoriosHomeImg} alt="" className={style.img__home} />
        <h2>ACCESORIOS</h2>
      </section>
    </main>
  );
};

export default Home;
