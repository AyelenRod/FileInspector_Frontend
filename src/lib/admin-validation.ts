import {
  MAX_CREDENTIAL_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@/lib/limits";

const USERNAME_PATTERN = /^[A-Za-z0-9._-]+$/;

export function validateNewAdmin(username: string, password: string): string | null {
  if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
    return `El usuario debe tener entre ${MIN_USERNAME_LENGTH} y ${MAX_USERNAME_LENGTH} caracteres.`;
  }
  if (!USERNAME_PATTERN.test(username)) {
    return "El usuario solo puede contener letras, números, punto, guion y guion bajo.";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (password.length > MAX_CREDENTIAL_LENGTH) {
    return `La contraseña no puede superar los ${MAX_CREDENTIAL_LENGTH} caracteres.`;
  }
  return null;
}
