"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import feriadoTrabajado from "./feriado-trabajado";
export default crearCalculadoraCliente(feriadoTrabajado);
