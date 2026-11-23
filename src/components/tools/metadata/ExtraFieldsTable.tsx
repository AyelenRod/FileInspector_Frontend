interface ExtraFieldsTableProps {
  fields: [string, string | number | null][];
}

export function ExtraFieldsTable({ fields }: ExtraFieldsTableProps) {
  return (
    <details className="mt-4">
      <summary className="cursor-pointer text-sm font-medium text-accent">
        Ver {fields.length} campos adicionales
      </summary>
      <table className="mt-2 w-full text-sm">
        <tbody>
          {fields.map(([key, value]) => (
            <tr key={key} className="border-b border-separator last:border-0">
              <th className="py-2 pr-4 text-left font-medium text-muted">{key}</th>
              <td className="break-all py-2">{String(value ?? "—")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
