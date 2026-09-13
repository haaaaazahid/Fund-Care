import Link from 'next/link';
import { services } from '@/lib/services';

export default function Footer() {
  return (
    <>
      <div className="wrap">
        <div className="bg-navy dark:bg-[var(--surface)] dark:border dark:border-[var(--line)] text-white rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h3 className="font-serif text-2xl md:text-[28px] max-w-md leading-snug">
            Want a plan built around your own numbers?
          </h3>
          <Link href="/book-appointment" className="btn-gold">Book Appointment</Link>
        </div>
      </div>

      <footer className="bg-navy dark:bg-[var(--surface)] dark:border-t dark:border-[var(--line)] text-white/70 pt-16 pb-8 mt-16">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="font-serif text-xl text-white mb-3.5">Fund Care</div>
              <p className="text-sm max-w-[220px] mb-2">Invest today for better tomorrow.</p>
              <p className="text-[11px] text-white/35 italic">Address, phone, and email pending — add in Admin → Site Settings.</p>
            </div>
            <div>
              <h5 className="text-white text-[13.5px] mb-4">Services</h5>
              {services.slice(0, 4).map((s) => (
                <Link key={s.slug} href={`/services#${s.slug}`} className="block text-[13.5px] mb-2.5 hover:text-gold">{s.name}</Link>
              ))}
            </div>
            <div>
              <h5 className="text-white text-[13.5px] mb-4">Calculators</h5>
              <Link href="/calculators#sip" className="block text-[13.5px] mb-2.5 hover:text-gold">SIP Calculator</Link>
              <Link href="/calculators#emi" className="block text-[13.5px] mb-2.5 hover:text-gold">EMI Calculator</Link>
              <Link href="/calculators#retirement" className="block text-[13.5px] mb-2.5 hover:text-gold">Retirement Calculator</Link>
            </div>
            <div>
              <h5 className="text-white text-[13.5px] mb-4">Company</h5>
              <Link href="/about" className="block text-[13.5px] mb-2.5 hover:text-gold">About</Link>
              <Link href="/about#experience" className="block text-[13.5px] mb-2.5 hover:text-gold">Experience</Link>
              <Link href="/insights" className="block text-[13.5px] mb-2.5 hover:text-gold">Insights</Link>
              <Link href="/contact" className="block text-[13.5px] mb-2.5 hover:text-gold">Contact</Link>
            </div>
            <div>
              <h5 className="text-white text-[13.5px] mb-4">Legal</h5>
              <Link href="#" className="block text-[13.5px] mb-2.5 hover:text-gold">Privacy Policy</Link>
              <Link href="#" className="block text-[13.5px] mb-2.5 hover:text-gold">Terms &amp; Conditions</Link>
              <Link href="#" className="block text-[13.5px] mb-2.5 hover:text-gold">Disclaimer</Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-3 text-xs">
            <span>© 2026 Fund Care. All rights reserved.</span>
            <span className="text-white/35 italic">Illustrative calculation results shown on this site are demo data only.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
