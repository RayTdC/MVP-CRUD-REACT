import app from "./src/app.js";

const port = 3000

app.listen(port, () => {
    console.log(`Aplicação escutando na porta ${port}`)
})