import {app} from "./app";
import {env} from "./env/index";

app.get('/hello', async (req,res) => {
    return res.status(200).send('Olá')
})

app.listen({
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
    port: env.PORT,
}, () => {
    console.log(`Servidor rodando na porta: ${env.PORT}`);
})

