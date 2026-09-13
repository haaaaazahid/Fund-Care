import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contact — Fund Care' };

export default function ContactPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Contact</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">Get in touch.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">
            Send an enquiry and it's logged as a lead you can follow up on. Business contact details below are placeholders — set them in Admin → Site Settings.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="wrap grid lg:grid-cols-2 gap-12">
          <ContactForm />
          <div className="space-y-4">
            <div className="card p-7">
              <h3 className="mb-2 text-navy dark:text-ink font-serif">Office</h3>
              <p className="text-muted text-sm">Address pending — add via Admin → Site Settings.</p>
            </div>
            <div className="card p-7">
              <h3 className="mb-2 text-navy dark:text-ink font-serif">Phone &amp; email</h3>
              <p className="text-muted text-sm">Pending — add via Admin → Site Settings.</p>
            </div>
            <div className="card p-7">
              <h3 className="mb-2 text-navy dark:text-ink font-serif">Prefer a scheduled call?</h3>
              <p className="text-muted text-sm mb-3.5">Book a fixed time instead of waiting for a reply.</p>
              <Link href="/book-appointment" className="btn-outline">Book Appointment</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
