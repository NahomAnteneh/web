"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useGroupContext } from "./group-context";
import { 
  Save, 
  Trash, 
  RefreshCw, 
  Upload, 
  Lock, 
  Globe, 
  ShieldAlert,
  Users,
  KeyRound,
  Bell,
  Mail
} from "lucide-react";

export function GroupSettingsView() {
  const { groupData, isLoading, error, updateGroupData } = useGroupContext();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [joinPermission, setJoinPermission] = useState('approval');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Set initial values when groupData is loaded
  useState(() => {
    if (groupData) {
      setGroupName(groupData.name);
      setGroupDescription(groupData.description);
      setIsPublic(groupData.isPublic);
    }
  });
  
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        <div className="space-y-6">
          <div className="h-28 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-28 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!groupData || !groupData.currentUserIsLeader) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Group Settings</CardTitle>
          <CardDescription>Manage your group settings</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShieldAlert className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {!groupData ? "Error loading group settings" : "Access Restricted"}
          </h2>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            {!groupData 
              ? (error || "Unable to load group settings. Please try again later.") 
              : "Only group leaders can access and modify group settings."
            }
          </p>
          {!groupData && (
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Handle save settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would send data to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update context with new values
      updateGroupData({
        name: groupName,
        description: groupDescription,
        isPublic,
      });
      
      // Show success message (in a real app)
      alert('Settings saved successfully');
    } catch (err) {
      console.error('Error saving settings:', err);
      // Show error message (in a real app)
      alert('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle group deletion
  const handleDeleteGroup = async () => {
    try {
      // In a real app, this would send a request to delete the group
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and redirect (in a real app)
      alert('Group deleted successfully. This is a mock implementation.');
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Error deleting group:', err);
      // Show error message (in a real app)
      alert('Error deleting group');
      setShowDeleteDialog(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Settings</CardTitle>
        <CardDescription>Manage your group settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Access</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea
                  id="groupDescription"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="Enter group description"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Briefly describe your group's purpose, goals, and the type of projects you work on.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupAvatar">Group Avatar</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border">
                    {groupData.avatar ? (
                      <img src={groupData.avatar} alt="Group avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-slate-400">
                        {groupName.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Avatar
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Privacy & Access Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Group Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Determine who can see this group
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isPublic ? (
                    <Globe className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-amber-500" />
                  )}
                  <Switch 
                    checked={isPublic} 
                    onCheckedChange={setIsPublic} 
                    aria-label="Toggle group visibility"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Join Permissions</Label>
                <p className="text-sm text-muted-foreground">
                  Control how new members can join your group
                </p>
                <RadioGroup value={joinPermission} onValueChange={setJoinPermission}>
                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="open" id="open" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="open" className="font-medium">Open</Label>
                      <p className="text-sm text-muted-foreground">
                        Anyone can join the group without approval.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="approval" id="approval" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="approval" className="font-medium">Approval Required</Label>
                      <p className="text-sm text-muted-foreground">
                        Group leader must approve join requests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="invite" id="invite" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="invite" className="font-medium">Invite Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Only people with invitation links can join.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>Group Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for group activity
                  </p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                  aria-label="Toggle notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                  aria-label="Toggle email notifications"
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Danger Zone */}
          <TabsContent value="danger" className="space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Actions here can't be undone. Please proceed with caution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Transfer Leadership</h4>
                      <p className="text-sm text-muted-foreground">
                        Transfer group leadership to another member
                      </p>
                    </div>
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Transfer
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Archive Group</h4>
                      <p className="text-sm text-muted-foreground">
                        Archive the group so it's read-only for all members
                      </p>
                    </div>
                    <Button variant="outline">Archive Group</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Group</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this group and all its data
                      </p>
                    </div>
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Group
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the 
                            group "{groupData.name}" and all of its data, including projects, 
                            conversations, and shared files.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteGroup}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Group
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 