import Artists from "../../components/Artists/Artists";
import Playlists from "../../components/Playlists/Playlists";
import Tracks from "../../components/Tracks/Tracks";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>get your stuff together</h1>
      <Artists />
      <Playlists />
      <Tracks />
    </div>
  );
};

export default Home;
