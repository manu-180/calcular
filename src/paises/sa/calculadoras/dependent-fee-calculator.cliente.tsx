"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import dependentFeeCalculator from "./dependent-fee-calculator";
export default crearCalculadoraCliente(dependentFeeCalculator);
