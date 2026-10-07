import { useState } from "react";

declare global { interface Window { PaystackPop: any } }

export default function Pricing() {
  const [email, setEmail] = useState("");

  const pay = (amount: number, plan: string) => {
    if (!email) return alert("Put your email first");
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_YOUR_KEY_HERE",
      email: email,
      amount: amount * 100,
      currency: "NGN",
      ref: `NWP_${Date.now()}`,
      metadata: { custom_fields: [{ display_name: plan, variable_name: plan, value: plan }] },
      callback: function(response: any) {
        alert(`Payment successful! Ref: ${response.reference}\nWe will email you in 5 mins. If not, DM @nwp.motivation on TikTok`);
        // Here you save to Google Sheet / WhatsApp API later
      },
      onClose: function() { alert("You closed it. Your future self is watching 👀"); }
    });
    handler.openIframe();
  };

  return (
    <section id="pricing" className="py-20 px-6 bg-zinc-950 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] opacity-50 mb-3">CHOOSE YOUR DISCIPLINE</p>
          <h2 className="text-4xl md:text-6xl font-black">INVEST IN YOUR<br/>FUTURE SELF</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PLAN 1 */}
          <div className="border border-white bg-white text-black p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-black text-white text-[9px] px-3 py-1 tracking-widest font-black">MOST CHOSEN</div>
            <h3 className="font-black text-2xl">INNER CIRCLE</h3>
            <p className="text-xs mt-2 opacity-70">For those tired of starting over every Monday</p>
            <div className="my-6"><span className="text-5xl font-black">₦3,000</span><span className="text-sm">/month</span></div>
            <ul className="text-xs space-y-3 mb-6 font-medium">
              <li>✓ 5AM WhatsApp voice note daily (30 days)</li>
              <li>✓ 100+ 4K no-watermark videos for your own TikTok</li>
              <li>✓ Daily lockscreen + discipline checklist</li>
              <li>✓ Private Telegram archive + early drops</li>
              <li>✓ Cancel anytime, no story</li>
            </ul>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email for delivery" className="w-full border border-black/20 p-3 text-xs mb-3 outline-none" />
            <button onClick={()=>pay(3000, "INNER_CIRCLE")} className="w-full bg-black text-white py-4 font-black tracking-widest text-xs">JOIN INNER CIRCLE →</button>
            <p className="text-[10px] mt-3 opacity-50 text-center">367 people joined this month. 4.9/5 rating from Lagos</p>
          </div>

          {/* PLAN 2 */}
          <div className="border border-white/10 bg-black p-8">
            <h3 className="font-black text-2xl">FUEL THE GRIND</h3>
            <p className="text-xs mt-2 opacity-60">Support the creator. No subscription.</p>
            <div className="my-6"><span className="text-5xl font-black">Any Amount</span></div>
            <p className="text-xs opacity-70 mb-6 leading-relaxed">
              I am one guy in Abuja editing at 1am with NEPA and data wahala. Your support = more drops, better videos, keep site free for everyone. You get shoutout on TikTok + your name on Wall of Builders.
            </p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email for thank you note" className="w-full border border-white/20 bg-transparent p-3 text-xs mb-3 outline-none text-white" />
            <div className="grid grid-cols-3 gap-2">
              <button onClick={()=>pay(1000,"FUEL")} className="border border-white/20 py-3 text-xs font-black hover:bg-white hover:text-black">₦1K COFFEE</button>
              <button onClick={()=>pay(5000,"FUEL")} className="border border-white/20 py-3 text-xs font-black hover:bg-white hover:text-black">₦5K DATA</button>
              <button onClick={()=>pay(10000,"FUEL")} className="border border-white/20 py-3 text-xs font-black hover:bg-white hover:text-black">₦10K GYM</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}