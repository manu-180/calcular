"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import correcaoIpca from "./correcao-ipca";
export default crearCalculadoraCliente(correcaoIpca);
