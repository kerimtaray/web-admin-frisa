import Styles from "./User.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
  
const User = (props) => {
  
  const handleEdit = () => {
    props.onEdit(); // Call the onEdit prop passed down from the AdminUserPage component
  };

  return (
    <div className={Styles.user}>
      <p>{props.data.username} - {props.data.email}</p>
      <div className={Styles.buttons}>
        <button
          className={Styles.button}
          onClick={handleEdit}  // Here you don't need to pass the ID anymore
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  );
};

export default User;


