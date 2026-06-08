import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import hospitalBg from "../../assets/hospital-bg.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Validation Error', description: 'Please enter your email', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: 'Success',
          description: 'Password reset link sent to your email successfully.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.message || 'Email not found.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the server.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Branding Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={hospitalBg} alt="Hospital" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#b71a22] via-[#b71a22]/70 to-transparent/20" />
        </div>
        
        <div className="relative z-10 p-12 flex-1 flex flex-col justify-end text-white pb-24">
           <h1 className="text-5xl font-bold mb-6 tracking-tight">Welcome to<br/>Believers Hospital</h1>
           <p className="text-xl text-white/90 max-w-md leading-relaxed">
             We are committed to providing exceptional healthcare with compassion, innovation and excellence.
           </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100">
           
           <button 
             onClick={() => navigate('/admin/login')}
             className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-8 transition-colors"
           >
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
           </button>

           <div className="text-center mb-10">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#b71a22]">
                 <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
              <p className="text-slate-500 mt-2">Enter your registered email address and we'll send you a link to reset your password.</p>
           </div>
           
           {!isSuccess ? (
             <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                   <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                   <Input 
                     id="email" 
                     type="email" 
                     placeholder="Enter your email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#b71a22]"
                     required 
                   />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-[#b71a22] hover:bg-[#9a151c] text-white shadow-lg shadow-red-500/20 transition-all rounded-xl mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                   {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
             </form>
           ) : (
             <div className="text-center space-y-6">
               <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                 <p className="text-emerald-800 font-medium">Reset link sent successfully!</p>
                 <p className="text-sm text-emerald-600 mt-1">Please check your inbox and follow the instructions to reset your password.</p>
               </div>
               <Button 
                  onClick={() => navigate('/admin/login')}
                  className="w-full h-12 text-base font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-lg transition-all rounded-xl mt-4"
                >
                   Return to Login
                </Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
