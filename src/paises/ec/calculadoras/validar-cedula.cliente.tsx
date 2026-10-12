"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import validarCedula from "./validar-cedula";
export default crearCalculadoraCliente(validarCedula);
