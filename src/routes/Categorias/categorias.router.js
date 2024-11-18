import { Router } from "express";
//importar json sin assert type module
import { readFile } from 'fs/promises';
const jsonPath = new URL('./categorias.data.json', import.meta.url);
const categorias = JSON.parse(await readFile(jsonPath, 'utf-8'));
//-------------------------------
const router = Router();

//consulta
router.get("/", (req, res) => {
    res.send(categorias);
})
//Crear categoria
router.post("/", (req, res) => {
    const { id, nombre,descripcion } = req.body;
    if (!id || !nombre || !descripcion) {
        return res.status(400).send("invalid data")
    } else {
        //Crear categoria
        const newCategoria = { ...req.body };
        categorias.push(newCategoria);
        res.send({ "status": "OK", "message": "Categoria created " })
    }
});
//Actualizar
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id: newId, nombre,descripcion } = req.body;
    if (newId && nombre && descripcion) {
        let categoriaEncontrado = false;
        categorias.map((item) => {
            if (item.id == id) {
                item.id = newId;
                item.nombre = nombre;
                item.descripcion = descripcion;
                categoriaEncontrado = true;
            }
            return item;
        });
        if (categoriaEncontrado) {
            return res.send({ status: "OK", message: "Categoria updated successfully" });
        } else {
            return res.status(404).send({ status: "error", error: "Categoria not found" });
        }
    }
    res.status(400).send({ status: "error", error: "Data not found" })
});
//Delete
router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    const index = categorias.findIndex((item) => item.id == id); 
    if (index === -1) {
        return res.status(400).send({status: "error",error: "Data not found",});
    }
    // Elimina r usuario
    categorias.splice(index, 1);
    res.send({status: "OK", message: "Categoria deleted successfully",});
});
export default router;