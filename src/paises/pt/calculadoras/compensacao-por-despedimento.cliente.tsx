"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import compensacaoPorDespedimento from "./compensacao-por-despedimento";
export default crearCalculadoraCliente(compensacaoPorDespedimento);
