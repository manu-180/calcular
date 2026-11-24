"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import endOfServiceCalculator from "./end-of-service-calculator";
export default crearCalculadoraCliente(endOfServiceCalculator);
