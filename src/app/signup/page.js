'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { WashiTape, FourPointStar, Asterisk } from '@/components/ui/Decorative';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const isValidEduEmail = (email) => {
    const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
    return eduEmailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEduEmail(formData.email)) {
      setError('Please use a valid .edu email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);
      setSuccess('Account created. Check your email for verification.');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Sign up error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden">
      <FourPointStar size={18} className="absolute top-20 right-12 text-taupe/40 star-pulse" />
      <Asterisk size={14} className="absolute bottom-24 left-16 text-hot-pink/30" />
      <FourPointStar size={12} className="absolute top-36 left-20 text-maroon/20 star-pulse" style={{ animationDelay: '0.5s' }} />

      <div className="max-w-sm w-full relative">
        <div className="relative z-10 -mb-3">
          <WashiTape rotate="1.5deg" className="mx-4" />
        </div>

        <div className="bg-white rounded-xl shadow-md border border-soft-pink px-8 py-10 relative">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl text-near-black tracking-tight mb-2">
              Join Clutch
            </h1>
            <p className="text-maroon text-sm font-medium tracking-wide">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label-caps text-dusty-rose mb-2 block">
                University Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-hot-pink/40 focus:border-hot-pink py-2 px-1 text-near-black placeholder-taupe/60 outline-none transition-colors text-sm"
                placeholder="you@university.edu"
              />
            </div>

            <div>
              <label htmlFor="password" className="label-caps text-dusty-rose mb-2 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-hot-pink/40 focus:border-hot-pink py-2 px-1 text-near-black placeholder-taupe/60 outline-none transition-colors text-sm"
                placeholder="at least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label-caps text-dusty-rose mb-2 block">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={loading}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-hot-pink/40 focus:border-hot-pink py-2 px-1 text-near-black placeholder-taupe/60 outline-none transition-colors text-sm"
                placeholder="re-enter your password"
              />
            </div>

            {error && (
              <div className="bg-maroon/10 border border-maroon/30 text-maroon px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-hot-pink/10 border border-hot-pink/30 text-maroon px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-full text-base font-medium shadow-sm transition-all bg-hot-pink text-white hover:bg-hot-pink/90 focus:outline-none focus:ring-2 focus:ring-hot-pink/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <p className="text-dusty-rose text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-hot-pink hover:text-maroon font-medium transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-taupe/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-taupe label-caps">
                  .edu email required
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <FourPointStar size={16} className="text-taupe/50" />
        </div>
      </div>
    </div>
  );
}
