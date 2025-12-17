"use client";

import { DataTable } from "@/components/shared/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/api/adminApi";
import { User } from "@/lib/types";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await adminApi.getAllUsers({
        page,
        limit: pagination.limit,
      });
      if (response.success && response.data) {
        setUsers(response.data);
        setPagination((prev) => ({
          ...prev,
          page,
          total: response.meta?.total || 0,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handleSearch = (query: string) => {
    fetchUsers(1, query);
  };

  const handleView = (id: string) => {
    // TODO: Implement view user details
    console.log("View user:", id);
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit user
    console.log("Edit user:", id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete user
    console.log("Delete user:", id);
  };

  const columns = [
    {
      key: "avatar",
      label: "Avatar",
      render: (user: User) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback>
            {user.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "full_name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => (
        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (user: User) => (
        <Badge variant={user.is_active ? "success" : "destructive"}>
          {user.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user: User) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(user.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(user.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(user.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchKey="users"
        pagination={{
          ...pagination,
          onPageChange: handlePageChange,
        }}
        onSearch={handleSearch}
        loading={loading}
      />
    </div>
  );
}
