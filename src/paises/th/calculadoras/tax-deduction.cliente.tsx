"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxDeduction from "./tax-deduction";
export default crearCalculadoraCliente(taxDeduction);
