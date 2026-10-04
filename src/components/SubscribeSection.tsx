import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Trash2, Users } from 'lucide-react';
import { playAmbientPulse } from '../utils/audio';

interface SubscriberEntry {
  email: string;
  subscribedAt: string;
}

export const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState<SubscriberEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nwp_subscribers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { email: 'alex.discipline@gmail.com', subscribedAt: 'Yesterday' },
      { email: 'marcus.aurelius26@outlook.com', subscribedAt: '3 days ago' },
      { email: 'relentless.mind@proton.me', subscribedAt: '5 days ago' },
    ];
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSubscribers, setShowSubscribers] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('nwp_subscribers', JSON.stringify(subscribers));
    } catch {
      // ignore
    }
  }, [subscribers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please provide a legitimate email format.');
      return;
    }

    // Check if already subscribed
    if (subscribers.some((sub) => sub.email === cleanEmail)) {
      setStatus('error');
      setErrorMessage('You are already registered in the inner circle.');
      return;
    }

    // Success: add to state
    playAmbientPulse();
    const newEntry: SubscriberEntry = {
      email: cleanEmail,
      subscribedAt: 'Just now',
    };
    setSubscribers([newEntry, ...subscribers]);
    setStatus('success');
    setEmail('');

    setTimeout(() => {
      setStatus('idle');
    }, 6000);
  };

  const handleRemove = (emailToRemove: string) => {
    setSubscribers(subscribers.filter((s) => s.email !== emailToRemove));
  };

  return (
    <section id="subscribe" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 relative">
      {/* Hairline subtle background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
          <span>Weekly Dispatch</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Zero Fluff</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Pure Focus</span>
        </div>

        {/* Required Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white font-['Syne',sans-serif]">
          Don't Miss The Message
        </h2>

        {/* Supporting text */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
          Every Sunday at 9:00 PM EST, we deliver one raw, unapologetic truth directly to your inbox. No promotions, no corporate sponsors. Just the standard.
        </p>

        {/* Email Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#090909] p-1.5 border border-neutral-800 focus-within:border-neutral-500 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email address..."
              aria-label="Email address"
              className="flex-1 px-4 py-3.5 bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Subscribe</span>
              <Send size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Feedback states */}
          {status === 'success' && (
            <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 text-white flex items-center justify-center gap-2 text-xs">
              <CheckCircle2 size={16} className="text-white" />
              <span>You are locked in. The next message drops Sunday at 9 PM.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center justify-center gap-2 text-xs">
              <AlertCircle size={16} className="text-neutral-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Counter and Local State Inspector */}
        <div className="mt-10 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <Users size={14} />
            <span>
              <strong className="text-white font-mono">{subscribers.length + 14890}</strong> minds on the direct wire
            </span>
          </div>

          <button
            onClick={() => setShowSubscribers(!showSubscribers)}
            className="text-neutral-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            {showSubscribers ? 'Hide Local Subscriber Roster' : `View Local State (${subscribers.length} saved)`}
          </button>
        </div>

        {/* Expandable Local State inspection */}
        {showSubscribers && (
          <div className="mt-6 p-4 bg-[#080808] border border-neutral-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-400">
              <span>Saved Email Subscriptions (Local State)</span>
              <span>Joined</span>
            </div>

            {subscribers.length === 0 ? (
              <p className="py-4 text-center text-xs text-neutral-400">No emails stored yet.</p>
            ) : (
              <ul className="divide-y divide-neutral-900 mt-2">
                {subscribers.map((item) => (
                  <li key={item.email} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-300">{item.email}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-400 text-[11px]">{item.subscribedAt}</span>
                      <button
                        onClick={() => handleRemove(item.email)}
                        className="text-neutral-400 hover:text-red-400 p-1 cursor-pointer transition-colors"
                        title="Remove from state"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
