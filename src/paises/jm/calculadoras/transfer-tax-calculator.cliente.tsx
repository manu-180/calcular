"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import transferTaxCalculator from "./transfer-tax-calculator";
export default crearCalculadoraCliente(transferTaxCalculator);
