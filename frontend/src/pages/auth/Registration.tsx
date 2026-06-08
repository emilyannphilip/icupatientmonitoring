import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default function Registration() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [empId, setEmpId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('Active');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, password, designation, status, empId, email }),
      });

      if (response.ok) {
        toast({
          title: 'Registration Successful',
          description: 'You can now log in with your new account.',
        });
        navigate('/admin/login');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Registration Failed',
          description: errorData.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the server.',
        variant: 'destructive',
      });
    }
  };

  const isFormValid = fullName && username && empId && email && password && confirmPassword && designation && status && (password === confirmPassword);

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-6 bg-slate-50 w-full h-full">
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
           <div className="text-center mb-10">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#b71a22]">
                 <UserPlus className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
              <p className="text-slate-500 mt-2">Provision a new user account</p>
           </div>
           
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name</Label>
                 <Input 
                   id="fullName" 
                   type="text" 
                   placeholder="Enter full name" 
                   value={fullName}
                   onChange={(e) => setFullName(e.target.value)}
                   className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#b71a22]"
                   required 
                 />
              </div>

              <div className="space-y-2">
                 <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
                 <Input 
                   id="username" 
                   type="text" 
                   placeholder="Choose a username" 
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#b71a22]"
                   required 
                 />
              </div>

              <div className="space-y-2">
                 <Label htmlFor="empId" className="text-slate-700 font-medium">Employee ID</Label>
                 <Input 
                   id="empId" 
                   type="text" 
                   placeholder="Enter your employee ID" 
                   value={empId}
                   onChange={(e) => setEmpId(e.target.value)}
                   className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#b71a22]"
                   required 
                 />
              </div>

              <div className="space-y-2">
                 <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                 <Input 
                   id="email" 
                   type="email" 
                   placeholder="Enter your email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#b71a22]"
                   required 
                 />
              </div>

              <div className="space-y-2">
                 <Label htmlFor="designation" className="text-slate-700 font-medium">Designation</Label>
                 <Select onValueChange={setDesignation} required>
                   <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:ring-[#b71a22]">
                     <SelectValue placeholder="Select designation" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Admin">Admin</SelectItem>
                     <SelectItem value="Doctor">Doctor</SelectItem>
                     <SelectItem value="Nurse">Nurse</SelectItem>
                     <SelectItem value="Technician">Technician</SelectItem>
                     <SelectItem value="Receptionist">Receptionist</SelectItem>
                     <SelectItem value="Staff">Staff</SelectItem>
                   </SelectContent>
                 </Select>
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                 <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-slate-50 border-slate-200 pr-10 focus-visible:ring-[#b71a22]"
                      required 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                 </div>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                 <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 bg-slate-50 border-slate-200 pr-10 focus-visible:ring-[#b71a22]"
                      required 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                 </div>
                 {confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500 font-medium">Passwords do not match</p>
                 )}
              </div>
              </div>
              
              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 mt-6">
                 <Button 
                   type="button" 
                   variant="outline" 
                   className="w-32 h-11 border-slate-200 text-slate-600"
                   onClick={() => {
                     setFullName('');
                     setUsername('');
                     setEmpId('');
                     setEmail('');
                     setPassword('');
                     setConfirmPassword('');
                     setDesignation('');
                     setStatus('Active');
                   }}
                 >
                   Reset
                 </Button>
                 <Button 
                   type="submit" 
                   className="w-48 h-11 text-base font-semibold bg-[#b71a22] hover:bg-[#9a151c] text-white shadow-lg shadow-red-500/20 transition-all rounded-xl disabled:opacity-50"
                   disabled={!isFormValid}
                 >
                   Register
                 </Button>
              </div>

            </form>
        </div>
      </div>
    </AdminLayout>
  );
}
