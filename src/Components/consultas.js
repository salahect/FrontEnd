import axios from "axios";


const url = "http://localhost:8000/mascotas";

export const getMascotas = async () => {
    const respuesta = await axios.get(`${url}/buscar`);
    return respuesta
};


export const getMascotasById = async (id) => {
    const respuesta = await axios.get(`${url}/buscar/${id}`);
    return respuesta
};