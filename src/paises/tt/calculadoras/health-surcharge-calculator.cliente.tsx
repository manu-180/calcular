"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import healthSurchargeCalculator from "./health-surcharge-calculator";
export default crearCalculadoraCliente(healthSurchargeCalculator);
