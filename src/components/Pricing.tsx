export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-zinc-950 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] opacity-50 mb-3">CHOOSE YOUR DISCIPLINE</p>
          <h2 className="text-4xl md:text-6xl font-black">INVEST IN YOUR<br/>FUTURE SELF</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white bg-white text-black p-8">
            <h3 className="font-black text-2xl">INNER CIRCLE</h3>
            <p className="text-xs mt-2 opacity-70">30 days discipline system</p>
            <div className="my-6"><span className="text-5xl font-black">₦3,000</span><span className="text-sm">/month</span></div>
            <a href="https://paystack.shop/pay/nowastedpotential-guide" target="_blank" className="block text-center w-full bg-black text-white py-4 font-black text-xs">JOIN INNER CIRCLE →</a>
          </div>

          <div className="border border-white/10 bg-black p-8">
            <h3 className="font-black text-2xl">FUEL THE GRIND</h3>
            <p className="text-xs mt-2 opacity-60">Pay any amount - one time</p>
            <div className="my-6"><span className="text-5xl font-black">Any Amount</span></div>
            <a href="https://paystack.shop/pay/nwp-fuel" target="_blank" className="block text-center w-full border border-white py-4 font-black text-xs hover:bg-white hover:text-black">DONATE →</a>
          </div>
        </div>
      </div>
    </section>
  );
}