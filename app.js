const express = require("express");
const app = express();
const port = 3000;
const books = require("./routes/books");

app.use(express.json());

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gestion de libros",
            version: "1.0.0",
            description: "App test APIRest",
            contact: {
                name: "Agustin R.R.",
                email: "arr@example.com"
            }
        },
        servers: [
            {url: "http://localhost:3000"}
        ],
        supportedSubmitMethods: []
    },
    apis: [
        "./routes/books.js"
    ]
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs, {customCss: ".swagger-ui .topbar, .swagger-ui .try-out {display: none}"}));


app.use("/routes", books);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});