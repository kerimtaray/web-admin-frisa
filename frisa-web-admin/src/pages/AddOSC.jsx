import Styles from "./AddOSC.module.css";
import { useState } from "react";
import axios from "axios";

const AddOSC = (props) => {
    const [oscData, setOSCData] = useState({
        name: "",
        description: "",
        location: "",
        moreInfo: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setOSCData({ ...oscData, [e.target.name]: e.target.value });
    };

    const cancelButton = (e) => {
        e.preventDefault();
        props.hideAddOSC();
    };

    const saveButton = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/osc", oscData);
            console.log(res);
            props.hideAddOSC();
            // Optionally refresh data or redirect as necessary
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
        }
    };

    const handleError = (err) => {
        // Adjust this error handling as necessary based on your backend's error messages
        return <p className={Styles.error}>{error}</p>;
    };

    return (
        <div className={Styles.overlay}>
            <div className={Styles.wrapper}>
                <div className={Styles.content}>
                    <h2>Crear OSC</h2>
                    <form className={Styles.form}>
                        <div className={Styles.title}>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ingresa el nombre de OSC..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className={Styles.description}>
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Descripción..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className={Styles.location}>
                            <label htmlFor="location">Ubicación</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Ubicación..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className={Styles.moreInfo}>
                            <label htmlFor="moreInfo">Más Información</label>
                            <input
                                type="text"
                                id="moreInfo"
                                name="moreInfo"
                                placeholder="Más Información..."
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    {handleError(error)}
                    <div className={Styles.buttons}>
                        <button className={Styles.cancel} type="button" onClick={cancelButton}>
                            Cancelar
                        </button>
                        <button className={Styles.save} type="button" onClick={saveButton}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOSC;
