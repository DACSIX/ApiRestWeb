import { Router } from "express";
//importar json sin assert type module
import { readFile } from 'fs/promises';
const jsonPath = new URL('./bitacoras.data.json', import.meta.url);
const bitacoras = JSON.parse(await readFile(jsonPath, 'utf-8'));
//-------------------------------
const router = Router();

//consulta
router.get("/", (req, res) => {
    res.send(bitacoras);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const encontrado = bitacoras.find((item) => item.id == id);
    if (encontrado) {
        return res.send(encontrado);
    } else {
        return res.status(404).send({ status: "error", error: "Bitacora not found" });
    }
});
//Crear una bitacora
router.post("/", (req, res) => {
    const { id, titulo, fecha_muestreo, localizacion, condiciones_climaticas, descripcion_habitat, fotos, id_usuario, especies, categoria, observaciones } = req.body;
    if (!id || !titulo || !fecha_muestreo || !localizacion || !condiciones_climaticas || !descripcion_habitat || !fotos || !id_usuario || !especies || !categoria || !observaciones) {
        return res.status(400).send("invalid data")
    } else {
        //Crear un nuevo usuario
        const newBitacora = { ...req.body };
        bitacoras.push(newBitacora);
        res.send({ "status": "OK", "message": "Bitacora created " })
    }
});
//Actualizar 
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id: newId, titulo, fecha_muestreo, localizacion, condiciones_climaticas, descripcion_habitat, fotos, id_usuario, especies, categoria, observaciones} = req.body;
    if (newId && titulo && fecha_muestreo && localizacion && condiciones_climaticas && descripcion_habitat && fotos && id_usuario && especies && categoria && observaciones) {
        let bitacoraEncontrado = false;
        bitacoras.map((item) => {
            if (item.id == id) {
                item.id = newId;
                item.titulo = titulo;
                item.fecha_muestreo = fecha_muestreo;
                item.localizacion = localizacion;
                item.condiciones_climaticas = condiciones_climaticas;
                item.descripcion_habitat = descripcion_habitat;
                item.fotos = fotos;
                item.id_usuario = id_usuario;
                item.especies = especies;
                item.categoria = categoria;
                item.observaciones = observaciones;
                bitacoraEncontrado = true;
            }
            return item;
        });
        if (bitacoraEncontrado) {
            return res.send({ status: "OK", message: "Bitacora updated successfully" });
        } else {
            return res.status(404).send({ status: "error", error: "Bitacora not found" });
        }
    }
    res.status(400).send({ status: "error", error: "Data not found" })
});
//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    const index = bitacoras.findIndex((item) => item.id == id); 
    if (index === -1) {
        return res.status(400).send({status: "error",error: "Data not found",});
    }
    // Eliminar bitacora
    bitacoras.splice(index, 1);
    res.send({status: "OK", message: "Bitacora deleted successfully",});
});
export default router;