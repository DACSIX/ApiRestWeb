import { Router } from "express";
//importar json sin assert type module
import { readFile } from 'fs/promises';
const jsonPath = new URL('./especies.data.json', import.meta.url);
const especies = JSON.parse(await readFile(jsonPath, 'utf-8'));
//-------------------------------
const router = Router();

//consulta
router.get("/", (req, res) => {
    res.send(especies);
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const encontrado = especies.find((item) => item.id == id);
    if (encontrado) {
        return res.send(encontrado);
    } else {
        return res.status(404).send({ status: "error", error: "Especies not found" });
    }
});

//Crear nueva especie
router.post("/", (req, res) => {
    const { id, nombreCientifico, nombreComun, familia, cantidadMuestras, estado, fotografias } = req.body;
    if (!id || !nombreCientifico || !nombreComun || !familia || !cantidadMuestras || !estado || !fotografias) {
        return res.status(400).send("invalid data")
    } else {
        //Crear nueva especie
        const newEspecie = { ...req.body };
        especies.push(newEspecie);
        res.send({ "status": "OK", "message": "Especie created " })
    }
});
//actualizar
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id: newId, nombreCientifico, nombreComun, familia, cantidadMuestras, estado, fotografias } = req.body;
    if (newId && nombreCientifico && nombreComun && familia && cantidadMuestras && estado, fotografias) {
        let especieEncontrado = false;
        especies.map((item) => {
            if (item.id == id) {
                item.id = newId;
                item.nombreCientifico = nombreCientifico;
                item.nombreComun = nombreComun;
                item.familia = familia;
                item.cantidadMuestras = cantidadMuestras;
                item.estado = estado;
                item.fotografias = fotografias;
                especieEncontrado = true;
            }
            return item;
        });
        if (especieEncontrado) {
            return res.send({ status: "OK", message: "Especie updated successfully" });
        } else {
            return res.status(404).send({ status: "error", error: "Especie not found" });
        }
    }
    res.status(400).send({ status: "error", error: "Data not found" })
})
//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    const index = especies.findIndex((item) => item.id == id); 
    if (index === -1) {
        return res.status(400).send({status: "error",error: "Data not found",});
    }
    // Eliminar especie
    especies.splice(index, 1);
    res.send({status: "OK", message: "Especie deleted successfully",});
});
export default router;