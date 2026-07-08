import { useState } from 'react';
import { X, LogIn, UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (!open) return null;

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError('Name is required.'); setLoading(false); return; }
        await register(form.name, form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function switchTab(t) {
    setTab(t);
    setError('');
    setForm({ name: '', email: '', password: '' });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-2 px-8 pt-8 pb-6">
          <div className="text-center">
            <h2
              className="text-3xl font-normal text-white tracking-[0.03em]"
              style={{ fontFamily: '"Zrnic", sans-serif' }}
            >
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-1 text-base text-white/40">
              {tab === 'login'
                ? 'Sign in to sync your builds across devices'
                : 'Save and access your builds from anywhere'}
            </p>
          </div>
        </div>

        <div className="mx-8 mb-6 relative flex rounded-lg bg-white/5">
          {/* Sliding indicator — moves behind the active tab */}
          <div
            className={`pointer-events-none absolute inset-y-0 w-1/2 rounded-md border-t border-l border-r border-b-0 border-primary bg-[#181002] transition-transform duration-300 ease-in-out ${
              tab === 'login' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          <button
            onClick={() => switchTab('login')}
            className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-base font-medium transition-colors duration-300 ${
              tab === 'login' ? 'text-primary' : 'text-white/50 hover:text-white'
            }`}
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-base font-medium transition-colors duration-300 ${
              tab === 'register' ? 'text-primary' : 'text-white/50 hover:text-white'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 pb-8">
          {/* Name field — always in DOM, animates in/out via max-height */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              tab === 'register'
                ? 'max-h-[72px] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required={tab === 'register'}
              autoComplete="name"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-base text-white placeholder-white/20 outline-none transition focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-base text-white placeholder-white/20 outline-none transition focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={6}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 pr-10 text-base text-white placeholder-white/20 outline-none transition focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/30"
            />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/60"
              >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#181002] text-primary py-3 text-base font-bold border-t border-l border-r border-b-0 border-primary transition hover:bg-[#1f1402] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
            ) : tab === 'login' ? (
              <><LogIn className="h-4 w-4" /> Sign In</>
            ) : (
              <><UserPlus className="h-4 w-4" /> Create Account</>
            )}
          </button>

          <p className="text-center text-sm text-white/30">
            {tab === 'login' ? (
              <>Don&apos;t have an account?{' '}
                <button type="button" onClick={() => switchTab('register')} className="text-primary hover:underline">
                  Register
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => switchTab('login')} className="text-primary hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
