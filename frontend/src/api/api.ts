import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export function apiGET<T>(url: string) {}

export function apiPOST<T>(url: string) {}

export function apiPUT<T>(url: string) {}
export function apiPATCH<T>(url: string) {}
