"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminApi, Certificate } from "@/lib/api/adminApi";
import { Eye, FileText, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      const response = await adminApi.getAllCertificates();
      if (response.success && response.data) {
        setCertificates(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const response = await adminApi.deleteCertificate(id);
      if (response.success) {
        toast.success("Certificate deleted successfully");
        fetchCertificates();
      } else {
        toast.error("Failed to delete certificate");
      }
    } catch (error) {
      toast.error("Failed to delete certificate");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <Link href="/content/certificates/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Certificate
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>
                    {certificate.user?.name || certificate.user_id}
                  </TableCell>
                  <TableCell>
                    {certificate.quiz?.title || certificate.quiz_id}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {certificate.score_achieved}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(certificate.issued_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {certificate.certificate_url ? (
                      <a
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                      </a>
                    ) : (
                      "No certificate"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/content/certificates/${certificate.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(certificate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}