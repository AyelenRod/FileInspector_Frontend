import { Card, Skeleton } from "@heroui/react";

export function MetadataViewerSkeleton() {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </Card.Content>
    </Card>
  );
}
