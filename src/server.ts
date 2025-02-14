import {app} from "./app";
import {env} from "./env/index";

app.listen({
    host: "0.0.0.0",
    port: env.PORT,
}, () => {
    console.log(`Servidor rodando na porta: ${env.PORT}`);
})

