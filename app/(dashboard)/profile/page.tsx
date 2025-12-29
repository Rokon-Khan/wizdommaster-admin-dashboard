"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Edit, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("about");

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Profile Header */}

        <div className="relative pt-16 pb-6 px-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
            <div className="relative -mt-24 sm:-mt-20">
              <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-2xl border-4 border-background overflow-hidden bg-muted">
                {currentUser.avatar_url || currentUser ? (
                  <Image
                    src={currentUser.avatar_url || "/placeholder.svg"}
                    alt={currentUser.full_name}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <UserIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {currentUser.full_name}
                </h1>
              </div>

              {/* {(currentUser.address || currentUser.location) && (
                <div className="flex items-center gap-1 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  {currentUser.address || currentUser.location}
                </div>
              )} */}

              {/* {currentUser.bio && (
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  {currentUser.bio}
                </p>
              )} */}
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Link href="/profile/edit" className="flex-1 sm:flex-none">
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
            <div></div>
            <div>
              <div>
                <div className="text-2xl font-bold gradient-text">
                  {new Date(currentUser.created_at).getFullYear()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member Since
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {currentUser.bio || "No bio provided yet."}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Member Info</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Member since{" "}
                      {new Date(currentUser.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="capitalize">Role: {currentUser.role}</p>
                    {(currentUser.address || "Not Provided") && (
                      <p>Location: {currentUser.address || "Not Provided"}</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">{currentUser.email}</p>
                  </div>
                  {currentUser.phone_number && (
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-muted-foreground">
                        {currentUser.phone_number}
                      </p>
                    </div>
                  )}
                  {/* {currentUser.gender && (
                    <div>
                      <h3 className="font-semibold mb-2">Gender</h3>
                      <p className="text-muted-foreground capitalize">
                        {currentUser.gender.toLowerCase()}
                      </p>
                    </div>
                  )} */}
                  {/* {currentUser.dateOfBirth && (
                    <div>
                      <h3 className="font-semibold mb-2">Date of Birth</h3>
                      <p className="text-muted-foreground">
                        {new Date(currentUser.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  )} */}
                  <div>
                    <h3 className="font-semibold mb-2">Account Status</h3>
                    <Badge
                      variant={
                        currentUser.is_active === true
                          ? "default"
                          : "destructive"
                      }
                    >
                      {currentUser.is_active === true ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  {/* <div>
                    <h3 className="font-semibold mb-2">Email Verified</h3>
                    <Badge
                      variant={
                        currentUser.isEmailVerified ? "default" : "secondary"
                      }
                    >
                      {currentUser.isEmailVerified
                        ? "Verified"
                        : "Not Verified"}
                    </Badge>
                  </div> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
