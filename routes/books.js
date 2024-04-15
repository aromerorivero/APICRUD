
const express = require("express");
const app = express();
/**
* @swagger
* tags:
*   name: Books
*   description: Books API REST
*/
/**
* @swagger
* components:
*   schemas:
*     Customer:
*       type: object
*       required:
*         - titulo
*         - autor
*         - editorial
*         - id
*       properties:
*         titulo:
*           type: string
*           description: Identificador único
*         autor:
*           type: string
*           description: Nombre del autor
*         editorial:
*           type: string
*           description: Nombre de la editorial
*         id:
*           type: string
*           description: Detalles del producto
*/

const books = [
    { titulo: "cancion de hielo y fuego", autor: "George R.R. Martin", editorial: "Penguin Random House", id: "1" },
    { titulo: "nacidos de la bruma", autor: "Brandon Sanderson", editorial: "Ediciones B", id: "2" },
    { titulo: "salvar el fuego", autor: "Guillermo Arriaga", editorial: "Alfaguara", id: "3" }
];
/**
* @swagger
* /routes/search?id=term:
*   get:
*     summary: Devuelve libros que coinciden con el id
*     tags: 
*       - Books
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*         required: true
*         description: identificador del libro
*     produces:
*       - application/json
*     responses:
*       200:
*         description: "Respuesta JSON {books: <array-books> | []}"
*       400:
*         description: "parametro incorrecto"
*       500:
*         description: "Error del servidor"
*/
app.get("/search", (req, res) => {
    if (!req.query.id) {
        return res.status(400).json({
            message: "parametro incorrecto"
        });
    }
    const findbookid = books.filter(book => book.id === req.query.id);
    console.log(findbookid);
    res.status(200).json({
        message: "ok",
        books: findbookid
    });
});
/**
* @swagger
* routes/id:
*   put:
*     summary: Actualizar libro
*     tags: 
*       - Books
*     parameters:
*       - in: body
*         name: id
*         required: true
*         schema:
*           type: string
*       - in: body
*         name: book object
*         description: Actualizar los datos del libro ya existentes o añadir nuevos
*         required: true
*         schema:
*           type: object
*           properties:
*             titulo:
*               type: "string"
*             autor:
*               type: "string"
*             editorial:
*               type: "string"
*             id:
*               type: "string"
*             Año de lanzamiento:
*               type: "string"
*             Idiomas doblados:
*               type: "string"
*     produces:
*       - application/json
*     responses:
*       200:
*         description: "ok"
*       400:
*         description: "id o datos obligatorios"
*       404:
*         description: "no se encontró ningún producto con ese id"
*       500:
*         description: "Error del servidor"
*/
app.put("/:id", (req, res) => {
    if (!req.body || !req.params.id) {
        return res.status(400).json({
            message: "id o datos obligatorios"
        });
    }
    const bookindex = books.findIndex(book => book.id === req.params.id);
    if (bookindex < 0) {
        return res.status(404).json({
            message: "no se encontró ningún producto con ese id"
        });
    }
    for (const property in req.body) {
        books[bookindex][property] = req.body[property];
    }
    res.status(200).json({
        message: 'ok',
        book: books[bookindex]
    });
});
/**
* @swagger
* /:
*   post:
*     summary: "Añade un nuevo libro"
*     tags: 
*       - Books
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - titulo
*               - autor
*               - editorial
*               - id
*             properties:
*               titulo:
*                 type: string
*                 description: Título del libro
*               autor:
*                 type: string
*                 description: Autor del libro
*               editorial:
*                 type: string
*                 description: Editorial del libro
*               id:
*                 type: string
*                 description: ID único del libro
*     responses:
*       200:
*         description: "Libro añadido"
*       400:
*         description: "Datos del libro obligatorios, Titulo del libro obligatorio, Autor del libro obligatorio, Editorial del libro obligatoria, Id del libro obligatorio"
*       500:
*         description: "Error del servidor"
*/
app.post("/", (req, res) => {
   
    if (!req.body) {
        return res.status(400).json({
            message: "Datos del libro obligatorios"
        });
    } 
    if (!req.body.titulo) {
        return res.status(400).json({
            message: "Titulo del libro obligatorio"
        });
    }
    if (!req.body.autor) {
        return res.status(400).json({
            message: "Autor del libro obligatorio"
        });
    }
    if (!req.body.editorial) {
        return res.status(400).json({
            message: "Editorial del libro obligatoria"
        });
    }
    if (!req.body.id) {
        return res.status(400).json({
            message: "Id del libro obligatorio"
        });
    }
    books.push(req.body);
    res.status(200).json({
        message: "Libro añadido",
        book: books[books.length - 1]
    });
});
/**
* @swagger
* routes/id:
*   delete:
*     summary: "Eliminar un libro"
*     tags: 
*       - Books
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del producto a eliminar
*         schema:
*           type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         description: "Libro eliminado correctamente"
*       400:
*         description: "id obligatorio"
*       404:
*         description: "no hay libros con ese id"
*       500:
*         description: "Error del servidor"
*/
app.delete("/:id", (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "id obligatorio"
        });
    }
    const bookIndex = books.findIndex(book => book.id === req.params.id);
    if (bookIndex < 0) {
        return res.status(404).json({
            message: "no hay libros con ese id"
        });
    }
    const delbook = books.splice(bookIndex, 1);
    res.status(200).json({
        message: "Libro eliminado correctamente",
        delbook
    });
});


module.exports = app;