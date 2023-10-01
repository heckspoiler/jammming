import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <ul className={style.navbar}>
      <Link to="/" className={style.navLink}>
        home
      </Link>
      <Link to="/artists" className={style.navLink}>
        artists
      </Link>
      {/* <li className="nav-link">Playlists</li>
      <li className="nav-link">Songs</li>
      <li className="nav-link">Podcasts</li> */}
    </ul>
  );
};
export default NavBar;
