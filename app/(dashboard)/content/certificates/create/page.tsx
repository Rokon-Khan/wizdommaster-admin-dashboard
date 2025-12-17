"use client";

import { CertificateForm } from "@/components/forms/CertificateForm";
import { adminApi } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateCertificatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await adminApi.createCertificate(data);
      if (response.success) {
        toast.success("Certificate created successfully");
        router.push("/content/certificates");
      } else {
        toast.error("Failed to create certificate");
      }
    } catch (error) {
      toast.error("Failed to create certificate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Certificate</h1>
      <CertificateForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}