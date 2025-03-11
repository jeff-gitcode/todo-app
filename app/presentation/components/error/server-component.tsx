"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React from "react";

function ServerComponent() {
  if (true) {
    throw new Error("Server-side error occurred");
  }

  return (
    <div>
      <Alert variant="destructive">
        <p>Server Component Content</p>
      </Alert>
      <Button>Click Me</Button>
    </div>
  );
}

export default ServerComponent;
