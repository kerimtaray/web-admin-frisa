import Styles from "./User.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
  
const User = (props) => {
  
  const handleEdit = () => {
    props.onEdit();
  };

  return (
    <div className={Styles.user}>
      <p>{props.data.username} - {props.data.email}</p>
      <div className={Styles.buttons}>
        <button
          className={Styles.button}
          onClick={handleEdit} 
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  );
};

export default User;


