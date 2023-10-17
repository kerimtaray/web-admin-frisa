import Styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar";
import OSCRequest from "../components/OSCRequest"; // Component to showcase each OSC request
import AddOSC from "./AddOSC";

import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const activeLinks = true;

  const [oscRequests, setOSCRequests] = useState([]);
  const [showAddOSC, setShowAddOSC] = useState(false);

  useEffect(() => {
    const fetchOSCRequests = async () => {
      try {
        const res = await axios.get("https://api-test-frisa-rmex-dev.fl0.io/admin/getAllOrgs");
        const nonAdmitedOrgs = res.data.data.results.filter(org => !org.admited);
        setOSCRequests(nonAdmitedOrgs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOSCRequests();
  }, []);

  const handleClick = () => {
    setShowAddOSC(!showAddOSC);
  };

  return (
    <div>
      <Navbar showLinks={activeLinks} />
      <h2>Solicitudes de OSCs</h2>

      {showAddOSC && <AddOSC hideAddOSC={handleClick} />}

      <div className={Styles.container}>
        <div className={Styles.oscRequests}>
          {oscRequests.map((request) => (
            <OSCRequest key={request._id} data={request} />
          ))}
        </div>
      </div>

      {!showAddOSC && (
        <button className={Styles.addButton} onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} size="2xl" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
