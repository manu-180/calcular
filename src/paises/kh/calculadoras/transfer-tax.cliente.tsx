"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import transferTax from "./transfer-tax";
export default crearCalculadoraCliente(transferTax);
