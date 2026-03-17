'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { WashiTape, PixelHeart, PixelBow, Sparkle, FourPointStar, CornerFlourish } from '@/components/ui/Decorative';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidEduEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) { setError('Please fill in all fields'); return; }
    if (!isValidEduEmail(formData.email)) { setError('Please use a valid .edu email address'); return; }
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') setError('No account found with this email. Please sign up first.');
      else if (error.code === 'auth/wrong-password') setError('Incorrect password. Please try again.');
      else if (error.code === 'auth/invalid-credential') setError('Invalid credentials. Please check your email and password.');
      else setError(error.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-cream bg-canvas flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative scattered elements */}
      <PixelHeart size={14} className="absolute top-16 left-10 sparkle" color="#F9C6D0" />
      <PixelBow size={18} className="absolute top-24 right-12 sparkle" color="#F9C6D0" style={{ animationDelay: '0.5s' }} />
      <Sparkle size={14} className="absolute bottom-28 left-16 text-soft-pink sparkle" style={{ animationDelay: '1s' }} />
      <PixelHeart size={10} className="absolute bottom-20 right-20 sparkle" color="#FF0090" style={{ animationDelay: '1.5s' }} />
      <FourPointStar size={18} className="absolute top-40 left-[70%] text-soft-pink star-pulse" />

      {/* Gingham accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gingham-rose opacity-40" />

      <div className="max-w-sm w-full relative z-10">
        {/* Washi tape across top */}
        <div className="relative z-10 -mb-3">
          <WashiTape rotate="-2deg" className="mx-4" />
        </div>

        {/* Login card */}
        <div className="bg-white rounded-xl shadow-md border border-soft-pink px-8 py-10 relative overflow-hidden">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="bottom-right" />

          {/* Masthead */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <PixelHeart size={12} color="#FF0090" />
              <PixelBow size={16} color="#FF0090" />
              <PixelHeart size={12} color="#FF0090" />
            </div>
            <h1 className="font-display text-6xl text-near-black tracking-tight mb-2">
              Clutch
            </h1>
            <p className="text-dusty-rose text-sm font-medium tracking-wide">
              Feminine help on standby.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="label-caps text-dusty-rose mb-2 block">
                University Email
              </label>
              <input
                id="email" name="email" type="email" required disabled={loading}
                value={formData.email} onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-soft-pink focus:border-hot-pink py-2 px-1 text-near-black placeholder-taupe/50 outline-none transition-colors text-sm"
                placeholder="you@university.edu"
              />
            </div>

            <div>
              <label htmlFor="password" className="label-caps text-dusty-rose mb-2 block">
                Password
              </label>
              <input
                id="password" name="password" type="password" required disabled={loading}
                value={formData.password} onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-soft-pink focus:border-hot-pink py-2 px-1 text-near-black placeholder-taupe/50 outline-none transition-colors text-sm"
                placeholder="enter your password"
              />
            </div>

            {error && (
              <div className="bg-deep-rose/10 border border-deep-rose/30 text-deep-rose px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 px-4 rounded-full text-base font-medium shadow-sm transition-all bg-hot-pink text-white hover:bg-hot-pink/90 focus:outline-none focus:ring-2 focus:ring-hot-pink/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify with GSU'}
            </button>

            <div className="text-center">
              <p className="text-taupe text-sm">
                New here?{' '}
                <button type="button" onClick={() => router.push('/signup')} className="text-hot-pink hover:text-deep-rose font-medium transition-colors">
                  Create account
                </button>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-soft-pink" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-dusty-rose label-caps">.edu email required</span>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center items-center gap-3 mt-5">
          <PixelHeart size={8} color="#F9C6D0" />
          <Sparkle size={10} className="text-soft-pink" />
          <PixelHeart size={8} color="#F9C6D0" />
        </div>
      </div>
    </div>
  );
}
