import { Router } from "express";
//importar json sin assert type module
import { readFile } from 'fs/promises';
const jsonPath = new URL('./comentarios.data.json', import.meta.url);
const comentarios = JSON.parse(await readFile(jsonPath, 'utf-8'));
//-------------------------------
const router = Router();

//consulta
router.get("/", (req, res) => {
    res.send(comentarios);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const encontrado = comentarios.find((item) => item.id == id);
    if (encontrado) {
        return res.send(encontrado);
    } else {
        return res.status(404).send({ status: "error", error: "Comentario not found" });
    }
});
//Crear nuevo comentario
router.post("/", (req, res) => {
    const { id, id_bitacora, id_usuario, texto, fecha} = req.body;
    if (!id || !id_bitacora || !id_usuario || !texto || !fecha) {
        return res.status(400).send("invalid data")
    } else {
        //Crear un nuevo comentario
        const newComentario = { ...req.body };
        comentarios.push(newComentario);
        res.send({ "status": "OK", "message": "Comentario created " })
    }
});
//Actualizar
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { id: newId, id_bitacora, id_usuario, texto, fecha} = req.body;
    if (newId && id_bitacora && id_usuario && texto && fecha) {
        let comentarioEncontrado = false;
        comentarios.map((item) => {
            if (item.id == id) {
                item.id = newId;
                item.id_bitacora = id_bitacora;
                item.id_usuario = id_usuario;
                item.texto = texto;
                item.fecha = fecha;
                comentarioEncontrado = true;
            }
            return item;
        });
        if (comentarioEncontrado) {
            return res.send({ status: "OK", message: "Comentario updated successfully" });
        } else {
            return res.status(404).send({ status: "error", error: "Comentario not found" });
        }
    }
    res.status(400).send({ status: "error", error: "Data not found" })
});
//Delete
router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    const index = comentarios.findIndex((item) => item.id == id); 
    if (index === -1) {
        return res.status(400).send({status: "error",error: "Data not found",});
    }
    // Elimina comentario
    comentarios.splice(index, 1);
    res.send({status: "OK", message: "Comentario deleted successfully",});
});
export default router;