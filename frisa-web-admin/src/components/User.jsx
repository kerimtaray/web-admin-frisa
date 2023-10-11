import Styles from "./User.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const User = (props) => {
  
  const handleDelete = async (id) => {
    // ... similar to before
  };

  const handleAccept = async (id) => {
    // Add logic to handle user acceptance
  };

  const handleEdit = async (id) => {
    // Add logic to handle user editing
  };

  return (
    <div className={Styles.user}>
      <p>{props.data.username} - {props.data.email}</p>
      <div className={Styles.buttons}>
        <button
          className={Styles.button}
          onClick={() => handleAccept(props.data.id)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className={Styles.button}
          onClick={() => handleEdit(props.data.id)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          className={Styles.button}
          onClick={() => handleDelete(props.data.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default User;
