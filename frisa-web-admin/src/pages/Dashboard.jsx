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

  const dummyOSCRequests = [
      {
        id: 1,
        name: "OSC 1",
        description: "This is a description for OSC 1. It covers various aspects of the OSC including its features and benefits.",
        location: "123 Main St, City, Country",
        moreInfo: "OSC 1 has been active since 2010 and has served thousands of customers. Visit our website for more.",
      },
      {
        id: 2,
        name: "OSC 2",
        description: "OSC 2 offers a wide range of products and services tailored to meet customer needs.",
        location: "456 Elm St, Another City, Another Country",
        moreInfo: "Our team at OSC 2 is dedicated to providing the best customer experience. Join our newsletter.",
      },
      {
        id: 3,
        name: "OSC 3",
        description: "A newer addition to our network, OSC 3 has already made significant strides in the industry.",
        location: "789 Maple St, New City, New Country",
        moreInfo: "Attend our annual OSC 3 convention next month for networking opportunities.",
      },
      {
        id: 4,
        name: "OSC 4",
        description: "Focused on innovation, OSC 4 has been a pioneer in introducing novel solutions.",
        location: "101 Pine St, Old City, Old Country",
        moreInfo: "OSC 4 was awarded 'Best Service' in 2021 by Industry Leaders magazine.",
      },
      {
        id: 5,
        name: "OSC 5",
        description: "The unique value proposition of OSC 5 has made it a favorite among certain demographics.",
        location: "202 Birch St, Coastal City, Coastal Country",
        moreInfo: "OSC 5 plans to expand its operations to two new countries next year.",
      },
      {
        id: 6,
        name: "OSC 6",
        description: "With a focus on sustainability, OSC 6 integrates eco-friendly practices in all its operations.",
        location: "303 Cedar St, Mountain City, Mountain Country",
        moreInfo: "Join OSC 6's green initiative by participating in our monthly community clean-ups.",
      },
      
  ];


  useEffect(() => {
    setOSCRequests(dummyOSCRequests);
  }, []);
    /*
    const fetchOSCRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/oscRequests");
        setOSCRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOSCRequests();
  }, [oscRequests]);
  */

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
            <OSCRequest key={request.id} data={request} />
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
