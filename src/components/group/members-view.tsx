"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGroupContext, GroupMember, GroupRole } from "./group-context";
import { 
  UserPlus, 
  MoreHorizontal, 
  UserMinus, 
  UserCog, 
  Mail, 
  MessageSquare, 
  Search, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  X,
  RefreshCw,
  Copy,
  Check
} from "lucide-react";

export function MembersView() {
  const { groupData, isLoading, error, removeMember, addMember } = useGroupContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showChangeRoleDialog, setShowChangeRoleDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<GroupRole>('Member');
  const [inviteLink, setInviteLink] = useState('https://vec-platform.example/invite/team/abc123xyz789');
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false);
  
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Group Members</h2>
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading members</h2>
          <p className="text-muted-foreground mb-4">{error || 'Unable to load group members. Please try again later.'}</p>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Filter members based on search query
  const filteredMembers = groupData.members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle member removal
  const handleRemoveMember = async () => {
    if (selectedMember) {
      await removeMember(selectedMember.id);
      setShowRemoveDialog(false);
      setSelectedMember(null);
    }
  };

  // Function to handle role change
  const handleRoleChange = (role: GroupRole) => {
    setNewMemberRole(role);
  };

  // Function to handle member invitation
  const handleInviteMember = async () => {
    // In a real app, this would send an invitation to the email
    // For now, we'll simulate adding a new member
    await addMember(Date.now()); // Using timestamp as a temporary ID
    setNewMemberEmail('');
    setShowInviteDialog(false);
  };

  // Function to copy invite link
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setInviteLinkCopied(true);
    setTimeout(() => setInviteLinkCopied(false), 3000);
  };

  // Helper function to get role icon
  const getRoleIcon = (role: GroupRole) => {
    switch (role) {
      case "Leader":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "Co-Leader":
        return <ShieldCheck className="h-4 w-4 text-amber-500" />;
      default:
        return <Shield className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Group Members</CardTitle>
            <CardDescription>Manage members of {groupData.name}</CardDescription>
          </div>
          {groupData.currentUserIsLeader && (
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button className="shrink-0">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Member to Group</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new member or share the invite link.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input
                      id="email"
                      placeholder="Enter email address"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">Role</label>
                    <Select value={newMemberRole} onValueChange={handleRoleChange as any}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Co-Leader">Co-Leader</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4">
                    <label className="text-sm font-medium">Or share invite link</label>
                    <div className="flex mt-2">
                      <Input 
                        value={inviteLink} 
                        readOnly 
                        className="flex-1 rounded-r-none"
                      />
                      <Button 
                        className="rounded-l-none border-l-0" 
                        onClick={copyInviteLink}
                        variant="outline"
                      >
                        {inviteLinkCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteMember} disabled={!newMemberEmail}>
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.name}</h3>
                      <Badge className="text-xs" variant="outline">
                        <span className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </span>
                      </Badge>
                      {member.isCurrentUser && (
                        <Badge className="bg-vec-primary/10 text-vec-primary text-xs">You</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">Joined on {new Date(member.joinedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href={`mailto:${member.email}`} title="Send Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Send Message">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  
                  {/* Only show member management options to group leaders and for non-self members */}
                  {groupData.currentUserIsLeader && !member.isCurrentUser && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedMember(member);
                            setShowChangeRoleDialog(true);
                          }}
                        >
                          <UserCog className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowRemoveDialog(true);
                          }}
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Remove from Group
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No members found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
      {groupData.members.length > 0 && (
        <CardFooter className="border-t bg-slate-50 px-6 py-4">
          <p className="text-sm text-muted-foreground">
            {groupData.members.length} {groupData.members.length === 1 ? 'member' : 'members'} in this group
          </p>
        </CardFooter>
      )}

      {/* Remove Member Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member from group?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {selectedMember?.name} from the group. They will lose access to all group 
              projects, conversations, and resources. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedMember(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemoveMember}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Dialog */}
      <Dialog open={showChangeRoleDialog} onOpenChange={setShowChangeRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedMember?.name} in this group.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select defaultValue={selectedMember?.role} onValueChange={handleRoleChange as any}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Member">Member</SelectItem>
                <SelectItem value="Co-Leader">Co-Leader</SelectItem>
                <SelectItem value="Leader">Leader</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowChangeRoleDialog(false);
                setSelectedMember(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowChangeRoleDialog(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
} 