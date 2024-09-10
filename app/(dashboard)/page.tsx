"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen, onClose } = useNewAccount();

  return (
    <div>
      home page
      <Button onClick={onOpen}>open account</Button>
    </div>
  );
}
