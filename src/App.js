import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    useEffect(() => {
    fetch("https://skfitness-backend.onrender.com/api/bookings")
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => setMessage("❌ Failed to fetch bookings"));
  }, []);


  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://skfitness-backend.onrender.com/api/bookings/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

        if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
        setMessage(`✅ Booking ${status}`);
      } else {
        setMessage("❌ Failed to update booking.");
      }
    } catch (err) {
      setMessage("❌ Server error.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  } 

  return (
    <div className="font-sans text-gray-800">
      {message && (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
    {message}
  </div>
)}
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <img src="/skfitness-logo.png" alt="SKFitness Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-black-600">SKFitness</span>
          </div>
          <nav className="space-x-6 hidden md:flex items-center">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
            <a href="https://instagram.com/skfitnessss" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Instagram</a>
            <a href="https://wa.me/447123456789" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-100 text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Body with SKFitness</h2>
        <p className="text-xl mb-6">1-on-1 personal training at PureGym tailored to your goals</p>
        <a href="#contact" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">Book Your Free Consultation</a>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold mb-6">About Me</h3>
        <p className="mb-4">Hi, I’m a certified personal trainer based at PureGym, and I help people achieve sustainable fitness transformations. With personalized workout plans and a focus on discipline and results, my mission is to empower you through fitness.</p>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">My Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "1-on-1 Training", desc: "Customized workouts in PureGym tailored to your body and goals." },
              { title: "Nutrition Coaching", desc: "Simple meal plans and tracking strategies that work." },
              { title: "Online Coaching", desc: "Train with me remotely with a plan and regular check-ins." },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold mb-10 text-center">What Clients Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Alex", feedback: "I lost 10kg in 3 months and feel stronger than ever!" },
            { name: "Jade", feedback: "SKFitness helped me build confidence and a new lifestyle." },
            { name: "Marcus", feedback: "Fun, effective workouts and great support throughout!" },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p className="italic">"{t.feedback}"</p>
              <p className="mt-4 font-semibold text-blue-600">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blue-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">Book a Free Consultation</h3>
          <form
            action="https://formspree.io/f/mjkokqyb"
            method="POST"
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
            onSubmit={(e) => {
              const name = e.target.elements.name.value;
              const email = e.target.elements.email.value;
              const phone = e.target.elements.phone.value;
              const message = e.target.elements.message.value;

              if (!name || !email || !phone || !message) {
                e.preventDefault();
                alert("Please fill in all fields.");
              }
            }}
          >
            <input type="text" name="name" placeholder="Name" required className="w-full border p-3 rounded-md" />
            <input type="email" name="email" placeholder="Email" required className="w-full border p-3 rounded-md" />
            <input type="tel" name="phone" placeholder="Phone Number" required className="w-full border p-3 rounded-md" />
            <textarea name="message" placeholder="Tell me your goals, struggles, or schedule..." required className="w-full border p-3 rounded-md h-32" />
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700">
              Send Message
            </button>
          </form>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/447123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.38 0 0 5.38 0 12a11.88 11.88 0 0 0 1.69 6.09L0 24l6.25-1.64A11.9 11.9 0 0 0 12 24c6.62 0 12-5.38 12-12 0-3.18-1.24-6.18-3.48-8.52ZM12 21.75a9.74 9.74 0 0 1-4.88-1.3l-.35-.2-3.72.98 1-3.62-.23-.37a9.82 9.82 0 1 1 18.25-5.45A9.76 9.76 0 0 1 12 21.75Zm5.08-7.25c-.26-.13-1.54-.76-1.78-.84-.24-.09-.41-.13-.58.13s-.66.84-.8 1.02c-.15.17-.3.2-.55.07s-1.07-.39-2.03-1.24c-.75-.67-1.25-1.5-1.4-1.75-.15-.26-.02-.4.11-.52.11-.11.26-.3.39-.44.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.5c-.17 0-.45.07-.68.33s-.9.88-.9 2.14.92 2.5 1.04 2.67c.13.17 1.8 2.75 4.36 3.86.61.26 1.09.41 1.46.53.61.2 1.16.17 1.6.1.49-.07 1.54-.63 1.76-1.25.22-.63.22-1.17.15-1.25-.06-.09-.24-.15-.5-.28Z" />
            </svg>
          </a>
        </div>
      </section>

            {/* Booking Form */}
      <section id="booking" className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">📅 Book a Session</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const res = await fetch("https://skfitness-backend.onrender.com/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: form.name.value,
                  phone: form.phone.value,
                  date: form.date.value,
                  time: form.time.value,
                }),
              });
              if (res.ok) {
                alert("✅ Booking submitted. Await approval!");
                form.reset();
              } else {
                alert("❌ Booking failed.");
              }
            }}
            className="space-y-4 bg-blue-50 p-6 rounded-xl shadow"
          >
            <input name="name" required placeholder="Full Name" className="w-full p-3 border rounded" />
            <input name="phone" required placeholder="Phone" className="w-full p-3 border rounded" />
            <input type="date" name="date" required className="w-full p-3 border rounded" />
            <input type="time" name="time" required className="w-full p-3 border rounded" />
            <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
              Book Now
            </button>
          </form>
        </div>
      </section>

      {/* Admin Panel */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">🛠 Admin Bookings Panel</h3>
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-bold">{b.name} ({b.phone})</p>
                  <p>{b.date} @ {b.time}</p>
                  <p className={`italic ${b.status === 'pending' ? 'text-yellow-600' : b.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {b.status}
                  </p>
                </div>
                {b.status === 'pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        if (window.confirm("Approve this booking?")) updateStatus(b.id, "approved");
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Reject this booking?")) updateStatus(b.id, "rejected");
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} SKFitness • Personal Training at PureGym</p>
      </footer>
    </div>
  );
}

export default App;



