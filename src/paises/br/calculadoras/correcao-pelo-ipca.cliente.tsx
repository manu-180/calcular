"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import correcaoPeloIpca from "./correcao-pelo-ipca";
export default crearCalculadoraCliente(correcaoPeloIpca);
