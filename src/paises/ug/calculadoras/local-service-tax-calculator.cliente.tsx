"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import localServiceTaxCalculator from "./local-service-tax-calculator";
export default crearCalculadoraCliente(localServiceTaxCalculator);
