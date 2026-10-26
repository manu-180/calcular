"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import calcularIva from "./calcular-iva";
export default crearCalculadoraCliente(calcularIva);
