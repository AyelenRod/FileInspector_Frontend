"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { ErrorAlert, SuccessAlert } from "@/components/shared/ErrorAlert";
import { useCreateAdmin } from "@/hooks/useCreateAdmin";
import { MAX_CREDENTIAL_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH } from "@/lib/limits";

interface CreateAdminModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  token: string;
  onUnauthorized: () => void;
}

const FIELD_CLASS =
  "flex items-center gap-2 rounded-xl border border-separator bg-background px-3 py-2.5 focus-within:border-danger";
const INPUT_CLASS = "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted";

export function CreateAdminModal({ isOpen, onOpenChange, token, onUnauthorized }: CreateAdminModalProps) {
  const form = useCreateAdmin(token, onUnauthorized);
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setShowPassword(false);
    }
    onOpenChange(open);
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Container>
          <Modal.Dialog aria-label="Crear nuevo administrador" className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent/20 text-danger">
                <UserPlus className="size-5" aria-hidden />
              </Modal.Icon>
              <Modal.Heading>Nuevo administrador</Modal.Heading>
              <p className="text-sm text-muted">
                La cuenta podrá iniciar sesión en este panel. Solo tú, como administrador, puedes crearla.
              </p>
            </Modal.Header>
            <form onSubmit={form.submit}>
              <Modal.Body className="flex flex-col gap-4 pt-4">
                <div>
                  <label htmlFor="new-admin-username" className="mb-2 block text-sm">Usuario</label>
                  <div className={FIELD_CLASS}>
                    <input
                      id="new-admin-username"
                      type="text"
                      autoComplete="off"
                      value={form.username}
                      onChange={(e) => form.setUsername(e.target.value)}
                      maxLength={MAX_USERNAME_LENGTH}
                      placeholder="nuevo_admin"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    De 3 a 50 caracteres: letras, números, punto, guion y guion bajo.
                  </p>
                </div>

                <div>
                  <label htmlFor="new-admin-password" className="mb-2 block text-sm">Contraseña</label>
                  <div className={FIELD_CLASS}>
                    <input
                      id="new-admin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) => form.setPassword(e.target.value)}
                      maxLength={MAX_CREDENTIAL_LENGTH}
                      placeholder="••••••••••••"
                      className={INPUT_CLASS}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      className="text-muted hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">Mínimo {MIN_PASSWORD_LENGTH} caracteres.</p>
                </div>

                <ErrorAlert message={form.error} />
                {form.created && (
                  <SuccessAlert title="Administrador creado" message={`El usuario «${form.created}» ya puede iniciar sesión.`} />
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" variant="secondary" onPress={() => handleOpenChange(false)}>
                  Cerrar
                </Button>
                <Button type="submit" isDisabled={form.isLoading}>
                  {form.isLoading ? "Creando…" : "Crear administrador"}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
