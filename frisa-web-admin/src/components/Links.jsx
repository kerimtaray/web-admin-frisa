import Styles from "./Links.module.css";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <ul className={Styles.links}>
      <li>
        <Link to="/dashboard" className={Styles.link}>
          Dashaboard
        </Link>
      </li>
      <li>
        <Link to="/dashboard/users" className={Styles.link}>
          Usuarios
        </Link>
      </li>
      <li>
        <Link to="/dashboard/oscs" className={Styles.link}>
          OSCs
        </Link>
      </li>
    </ul>
  );
};

export default Links;
