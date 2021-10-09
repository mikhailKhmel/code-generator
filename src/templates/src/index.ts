import express from "express";

const app = express();
const port = 8080; // default port to listen


{%endpoints%}

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});