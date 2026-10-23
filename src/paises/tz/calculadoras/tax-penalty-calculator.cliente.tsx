"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxPenaltyCalculator from "./tax-penalty-calculator";
export default crearCalculadoraCliente(taxPenaltyCalculator);
