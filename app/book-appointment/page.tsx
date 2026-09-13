import BookingFlow from '@/components/BookingFlow';

export const metadata = { title: 'Book Appointment — Fund Care' };

export default function BookAppointmentPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Appointments</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">Book an appointment.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">
            Five short steps. Your details are stored in your browser for this demo — the backend scaffold shows how to persist bookings to a real database.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="wrap">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
