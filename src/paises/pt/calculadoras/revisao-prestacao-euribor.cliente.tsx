"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import revisaoPrestacaoEuribor from "./revisao-prestacao-euribor";
export default crearCalculadoraCliente(revisaoPrestacaoEuribor);
