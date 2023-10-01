import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
// import ArtistPage from "../../pages/ArtistPage/ArtistPage";

const NavBar = () => {
  return (
    <ul className={style.navbar}>
      {/* <Link to={<ArtistPage />}>Artists</Link> */}
      <li>Playlists</li>
      <li>Songs</li>
      <li>Podcasts</li>
      <li></li>
    </ul>
  );
};
export default NavBar;
