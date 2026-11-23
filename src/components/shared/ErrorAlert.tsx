import { Alert } from "@heroui/react";

export function ErrorAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <Alert status="danger">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Algo salió mal</Alert.Title>
        <Alert.Description>{message}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

export function SuccessAlert({ title, message }: { title: string; message?: string }) {
  return (
    <Alert status="success">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        {message && <Alert.Description>{message}</Alert.Description>}
      </Alert.Content>
    </Alert>
  );
}
