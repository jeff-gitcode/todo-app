"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React from "react";

function ClientComponent() {
  if (true) {
    throw new Error("Client-side error occurred");
  }

  return (
    <div>
      <Alert variant="destructive">
        <p>Client Component Content</p>
      </Alert>
      <Button>Click Me</Button>
    </div>
  );
}

export default ClientComponent;
