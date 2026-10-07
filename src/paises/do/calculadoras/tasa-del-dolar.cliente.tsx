"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import tasaDelDolar from "./tasa-del-dolar";
export default crearCalculadoraCliente(tasaDelDolar);
