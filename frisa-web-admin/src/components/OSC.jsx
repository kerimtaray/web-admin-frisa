import Styles from "./OSC.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
  
const OSC = (props) => {
  
  const handleEdit = () => {
    props.onEdit(); // Call the onEdit prop passed down from the AdminOSCPage component
  };

  return (
    <div className={Styles.osc}>
      <p>{props.data.name} - {props.data.email} - {props.data.city}, {props.data.state}</p>
      <div className={Styles.buttons}>
        <button
          className={Styles.button}
          onClick={handleEdit}  // Triggers the edit function passed as a prop
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  );
};

export default OSC;
