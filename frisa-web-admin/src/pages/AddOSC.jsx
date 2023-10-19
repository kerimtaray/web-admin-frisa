import Styles from "./AddOSC.module.css";
import { useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';


const AddOSC = (props) => {
    const [oscData, setOSCData] = useState({
        name: "",
        adminName: "",
        rfc: "",
        description: "",
        phoneNumber: "",
        state: "",
        city: "",
        email: "",
        webpage: "",
        category: "",
        password:""
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
            const res = await axios.post("https://api-test-frisa-rmex-dev.fl0.io/auth/oscregister", oscData); 
            console.log(res);
            props.hideAddOSC();
        } catch (err) {
            console.log(err);
            setError(err.response.data.message); 
        }
    };

    // Excel 

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadExcel = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Por favor, selecciona un archivo primero.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const json = XLSX.utils.sheet_to_json(worksheet);

            console.log(json)

            try {
                const response = await axios.post("https://api-test-frisa-rmex-dev.fl0.io/admin/uploadExcelOsc", json);
                console.log(response);
            } catch (err) {
                console.log(err);
                setError(err.response ? err.response.data.error : "Ocurrió un error al subir el archivo.");
            }
        };

        reader.readAsArrayBuffer(file);
    };


    return (
        <div className={Styles.overlay}>
            <div className={Styles.wrapper}>
                <div className={Styles.content}>
                    <h2>Crear OSC</h2>
                    <form className={Styles.form}>
                        
                        <div className={Styles.name}>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" placeholder="Ingresa el nombre de OSC..." onChange={handleChange} />
                        </div>

                        <div className={Styles.adminName}>
                            <label htmlFor="adminName">Admin Nombre</label>
                            <input type="text" id="adminName" name="adminName" placeholder="Nombre del administrador..." onChange={handleChange} />
                        </div>

                        <div className={Styles.rfc}>
                            <label htmlFor="rfc">RFC</label>
                            <input type="text" id="rfc" name="rfc" placeholder="RFC..." onChange={handleChange} />
                        </div>

                        <div className={Styles.description}>
                            <label htmlFor="description">Descripción</label>
                            <textarea id="description" name="description" placeholder="Descripción..." onChange={handleChange} />
                        </div>

                        <div className={Styles.phoneNumber}>
                            <label htmlFor="phoneNumber">Número de Teléfono</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Teléfono..." onChange={handleChange} />
                        </div>

                        <div className={Styles.state}>
                            <label htmlFor="state">Estado</label>
                            <input type="text" id="state" name="state" placeholder="Estado..." onChange={handleChange} />
                        </div>

                        <div className={Styles.city}>
                            <label htmlFor="city">Ciudad</label>
                            <input type="text" id="city" name="city" placeholder="Ciudad..." onChange={handleChange} />
                        </div>

                        <div className={Styles.email}>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" id="email" name="email" placeholder="Email..." onChange={handleChange} />
                        </div>

                        <div className={Styles.webpage}>
                            <label htmlFor="webpage">Página Web</label>
                            <input type="url" id="webpage" name="webpage" placeholder="Página Web..." onChange={handleChange} />
                        </div>

                        <div className={Styles.category}>
                            <label htmlFor="category">Categoría</label>
                            <select id="category" name="category" onChange={handleChange}>
                                <option value="Salud">Salud</option>
                                <option value="Educación">Educación</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        <div className={Styles.password}>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" placeholder="Contraseña..." onChange={handleChange} />
                        </div>

                          <div className={Styles.fileInput}>
                            <label>Cargar Excel:</label>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                            <button type="button" onClick={handleUploadExcel}>Subir Excel</button>
                        </div>

                        <div className={Styles.buttons}>
                            <button className={Styles.cancel} type="button" onClick={cancelButton}>
                                Cancelar
                            </button>
                            <button className={Styles.save} type="button" onClick={saveButton}>
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOSC;
