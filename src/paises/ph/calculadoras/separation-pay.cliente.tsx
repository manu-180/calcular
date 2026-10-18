"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import calculadora from "./separation-pay";
export default crearCalculadoraCliente(calculadora);
