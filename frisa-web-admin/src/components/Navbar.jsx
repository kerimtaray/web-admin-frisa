import Styles from "./Navbar.module.css";
import Links from "./Links";

import LoginPage from "../pages/LoginPage";

const Navbar = (props) => {
  const showLinks = props.showLinks;

  const logout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <div className={Styles.navbar}>
      <h1>
        <span className={Styles.e}>F</span>
        <span className={Styles.e}>R</span>
        <span className={Styles.e}>I</span>
        <span className={Styles.e}>S</span>
        <span className={Styles.e}>A</span>
      </h1>
      <div className={Styles.buttons}>
        {showLinks && <Links />}
        {!props.isLogin && (
          <button className={Styles.logout} onClick={logout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
