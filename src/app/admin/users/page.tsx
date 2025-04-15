"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, UserPlus, UserMinus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Type definitions
type UserType = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: {
    id: number;
    roleName: string;
  };
};

export default function AdminUsersPage() {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'assign' | 'revoke' | null>(null);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    students: 0,
    advisors: 0,
    admins: 0
  });

  // Redirect if user is not an admin
  useEffect(() => {
    if (!isLoading && (!user || !hasRole('admin'))) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, hasRole, router]);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
      
      // Calculate stats
      const stats = {
        totalUsers: data.users.length,
        students: data.users.filter((u: UserType) => u.role.roleName === 'student').length,
        advisors: data.users.filter((u: UserType) => u.role.roleName === 'advisor').length,
        admins: data.users.filter((u: UserType) => u.role.roleName === 'admin').length
      };
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && hasRole('admin')) {
      fetchUsers();
    }
  }, [user, hasRole]);

  // Handle role change
  const handleRoleChange = async () => {
    if (!selectedUser || !actionType) return;
    
    try {
      const response = await fetch('/api/admin/users/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          action: actionType, // 'assign' or 'revoke'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const data = await response.json();
      toast.success(data.message);
      
      // Refresh the user list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error("Failed to update user role");
    } finally {
      setConfirmDialogOpen(false);
      setSelectedUser(null);
      setActionType(null);
    }
  };

  const openConfirmDialog = (user: UserType, action: 'assign' | 'revoke') => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  if (isLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !hasRole('admin')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage system users and their roles</p>
        </div>
        <Button onClick={fetchUsers} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.students}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Advisors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.advisors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            View and manage all users in the system. Use the buttons to assign or revoke the Advisor role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="advisors">Advisors</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <UserTable 
                users={users} 
                openConfirmDialog={openConfirmDialog} 
              />
            </TabsContent>
            
            <TabsContent value="students">
              <UserTable 
                users={users.filter(u => u.role.roleName === 'student')} 
                openConfirmDialog={openConfirmDialog} 
              />
            </TabsContent>
            
            <TabsContent value="advisors">
              <UserTable 
                users={users.filter(u => u.role.roleName === 'advisor')} 
                openConfirmDialog={openConfirmDialog} 
              />
            </TabsContent>
            
            <TabsContent value="admins">
              <UserTable 
                users={users.filter(u => u.role.roleName === 'admin')} 
                openConfirmDialog={openConfirmDialog} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'assign' 
                ? 'Assign Advisor Role' 
                : 'Revoke Advisor Role'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'assign'
                ? `Are you sure you want to assign the Advisor role to ${selectedUser?.firstName} ${selectedUser?.lastName}?`
                : `Are you sure you want to revoke the Advisor role from ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// User Table Component
function UserTable({ 
  users, 
  openConfirmDialog 
}: { 
  users: UserType[],
  openConfirmDialog: (user: UserType, action: 'assign' | 'revoke') => void
}) {
  return (
    <Table>
      <TableCaption>Total users: {users.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName} {user.lastName}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge 
                variant={
                  user.role.roleName === 'admin' 
                    ? 'destructive' 
                    : user.role.roleName === 'advisor' 
                    ? 'default' 
                    : 'secondary'
                }
              >
                {user.role.roleName}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {user.role.roleName !== 'admin' && (
                <>
                  {user.role.roleName === 'student' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openConfirmDialog(user, 'assign')}
                      className="ml-2"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Make Advisor
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openConfirmDialog(user, 'revoke')}
                      className="ml-2"
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Remove Advisor
                    </Button>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 