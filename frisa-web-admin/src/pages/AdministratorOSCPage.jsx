import Styles from "./AdministratorOSCPage.module.css";
import Navbar from "../components/Navbar";
import OSC from "../components/OSC"; // Component to showcase each OSC
import EditOSC from "../components/EditOSC"; // Component to edit an OSC
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminOSCPage = () => {
  const activeLinks = true;

  const [oscs, setOSCs] = useState([]);
  const [showAddOSC, setShowAddOSC] = useState(false);
  const [editingOSC, setEditingOSC] = useState(null); 

  useEffect(() => {
    const fetchOSCs = async () => {
      try {
        const res = await axios.get("https://api-test-frisa-rmex-dev.fl0.io/admin/getAllOrgs");
        // Using the 'results' key from the API response to set the OSCs
        setOSCs(res.data.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOSCs();
  }, []);

  const handleClick = () => {
    setShowAddOSC(!showAddOSC);
  };

  const handleUpdateOSC = (updatedOSC) => {
    setOSCs(prevOSCs => prevOSCs.map(osc => osc._id === updatedOSC._id ? updatedOSC : osc));
    setEditingOSC(null); 
  };

  return (
    <div>
      <Navbar showLinks={activeLinks} />
      <h2>OSCs Registradas</h2>

      {showAddOSC && <AddOSC hideAddOSC={handleClick} />}

      {editingOSC && 
        <EditOSC 
          oscData={editingOSC} 
          hideEditOSC={() => setEditingOSC(null)} 
          updateOSC={handleUpdateOSC}
        />
      }

      <div className={Styles.container}>
        <div className={Styles.oscs}>
          {oscs.map((osc) => (
            <OSC key={osc._id} data={osc} onEdit={() => setEditingOSC(osc)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOSCPage;
