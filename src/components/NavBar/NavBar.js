import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import ArtistPage from "../../pages/ArtistPage/ArtistPage";

const NavBar = () => {
  return (
    <ul className={style.navbar}>
      <Link to="/">home</Link>
      <Link to="/artists">artists</Link>
      <li>Playlists</li>
      <li>Songs</li>
      <li>Podcasts</li>
      <li></li>
    </ul>
  );
};
export default NavBar;
