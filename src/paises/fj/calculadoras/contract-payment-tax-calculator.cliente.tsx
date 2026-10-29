"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import contractPaymentTaxCalculator from "./contract-payment-tax-calculator";
export default crearCalculadoraCliente(contractPaymentTaxCalculator);
