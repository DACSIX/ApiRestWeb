import bitacoraRouter from "./routes/Bitacoras/bitacoras.router.js";
import especieRouter from "./routes/Especies/especies.router.js";
import comentarioRouter from "./routes/comentarios/comentarios.router.js";
import categoriaRouter from "./routes/Categorias/categorias.router.js";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(cors({ origin: "*" }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(`/api/bitacoras`, bitacoraRouter);
app.use(`/api/especies`, especieRouter);
app.use(`/api/comentarios`, comentarioRouter);
app.use(`/api/categorias`, categoriaRouter);

//main
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

//strating server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})

