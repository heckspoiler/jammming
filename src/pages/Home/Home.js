import Artists from "../../components/Artists/Artists";
import Playlists from "../../components/Playlists/Playlists";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Artists />
      <Playlists />
    </div>
  );
};

export default Home;
