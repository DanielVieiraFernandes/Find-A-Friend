import fastify from "fastify";
import { orgRoutes } from "./http/controllers/org/routes";
import fastifyCookie from "@fastify/cookie";
export const app = fastify();

app.register(fastifyCookie);
app.register(orgRoutes);