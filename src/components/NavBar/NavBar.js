import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <ul className={style.navbar}>
      <li>Artists</li>
      <li>Playlists</li>
      <li>Songs</li>
      <li>Podcasts</li>
      <li></li>
    </ul>
  );
};
export default NavBar;
