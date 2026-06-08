import React, { useState, useRef } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { Camera, Edit2, Lock, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const { user, updateProfile } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: 'Error', description: 'Image size must be less than 2MB', variant: 'destructive' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        setIsEditing(true); // Automatically switch to edit mode to save
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setFullName(user?.fullName || '');
    setUsername(user?.username || '');
    setEmail(user?.email || '');
    setProfilePicture(user?.profilePicture || '');
    setIsEditing(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      const payload = {
        fullName,
        username,
        email,
        profilePicture,
        designation: user.designation,
        status: user.status
      };

      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        updateProfile({ 
          fullName: updatedUser.fullName, 
          username: updatedUser.username,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture
        });
        toast({ title: 'Success', description: 'Profile updated successfully' });
        setIsEditing(false);
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.message || 'Failed to update profile', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Server error while updating profile', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-brand">User Profile</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>
        
        <Card className="shadow-md overflow-hidden">
          <div className="h-32 bg-slate-100 border-b relative">
            <div className="absolute -bottom-12 left-8">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-50">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-slate-300">
                      {fullName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg" 
                  onChange={handleImageUpload} 
                />
              </div>
            </div>
          </div>
          
          <CardContent className="pt-16 pb-8 px-8">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    disabled={!isEditing}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    disabled={!isEditing}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={!isEditing}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Designation (Role)</Label>
                  <Input value={user?.designation || ''} disabled className="bg-slate-50 text-slate-500 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input value={user?.empId || '-'} disabled className="bg-slate-50 text-slate-500 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {user?.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={isSaving}>
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button type="submit" className="bg-brand hover:bg-[#9a151c] text-white" disabled={isSaving}>
                    {isSaving ? 'Saving...' : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Security</h3>
              <p className="text-sm text-slate-500 mb-4">Manage your password and security settings.</p>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => navigate('/admin/change-password')}
              >
                <Lock className="w-4 h-4 mr-2" /> Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
