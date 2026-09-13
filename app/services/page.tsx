import Link from 'next/link';
import { services } from '@/lib/services';
import { Reveal } from '@/components/HomeSections';

export const metadata = { title: 'Services — Fund Care' };

export default function ServicesPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Services</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">Financial planning built around your goals.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">Eight areas of advisory work, each with its own process. Jump to any service, or scroll through all of them below.</p>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.slug} id={s.slug} className="border-t border-[var(--line)] py-16">
          <div className="wrap">
            <Reveal className="max-w-[600px] mb-10">
              <div className="section-kicker">Service</div>
              <h2 className="text-[clamp(28px,3.4vw,38px)] text-navy dark:text-ink font-serif">{s.name}</h2>
              <p className="text-muted mt-3.5">{s.description}</p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-px bg-[var(--line)]">
              <div className="bg-[var(--bg)] p-8">
                <h3 className="text-navy dark:text-ink text-lg mb-3 font-serif">The problem this solves</h3>
                <p className="text-muted text-sm">{s.problem}</p>
              </div>
              <div className="bg-[var(--bg)] p-8">
                <h3 className="text-navy dark:text-ink text-lg mb-3 font-serif">Our process</h3>
                <ol className="pl-4.5 text-muted text-sm leading-8 list-decimal">
                  {s.process.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </div>
            <div className="mt-7">
              <Link href="/book-appointment" className="btn-gold">Book Appointment for {s.name}</Link>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
