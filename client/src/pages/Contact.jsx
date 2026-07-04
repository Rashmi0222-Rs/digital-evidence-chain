
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully");
    setForm({ name: "", email: "", message: "" });
  };

  const faqs = [
    ["Is CyberPortal secure?", "Yes, it uses JWT authentication, role-based access and SHA-256 evidence verification."],
    ["Who can use this system?", "Admins, verifiers and users can access dedicated dashboards based on their role."],
    ["Can it detect tampered evidence?", "Yes, the system compares SHA-256 hashes and marks files as verified or tampered."],
    ["Can reports be exported?", "Yes, PDF and Excel reports are supported."]
  ];

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      <CyberBackground />
      <CyberEffects />
      <Navbar />

      <section className="relative z-10 px-10 py-24">
        <p className="text-cyan-300 font-bold mb-4">CONTACT CYBERPORTAL</p>

        <h1 className="text-7xl font-extrabold leading-tight max-w-5xl">
          Need Help With
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
            Digital Evidence Security?
          </span>
        </h1>

        <p className="text-slate-300 text-lg mt-6 max-w-3xl">
          Contact our support team for project information, technical help,
          evidence workflow queries or platform demonstration.
        </p>
      </section>

      <section className="relative z-10 px-10 grid lg:grid-cols-3 gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <Mail className="text-cyan-300 mb-5" size={45} />
          <h3 className="text-2xl font-bold">Email</h3>
          <p className="text-slate-400 mt-2">support@cyberportal.com</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <Phone className="text-purple-300 mb-5" size={45} />
          <h3 className="text-2xl font-bold">Phone</h3>
          <p className="text-slate-400 mt-2">+91 98765 43210</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <MapPin className="text-green-300 mb-5" size={45} />
          <h3 className="text-2xl font-bold">Location</h3>
          <p className="text-slate-400 mt-2">Bangalore, India</p>
        </div>
      </section>

      <section className="relative z-10 px-10 py-20 grid lg:grid-cols-2 gap-10">
        <form
          onSubmit={submitHandler}
          className="rounded-3xl border border-cyan-400/20 bg-slate-950/70 backdrop-blur-xl p-8"
        >
          <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-3">
            <MessageSquare className="text-cyan-300" />
            Send Message
          </h2>

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-5 rounded-xl bg-slate-950 border border-white/10 px-5 py-4 outline-none"
          />

          <input
            placeholder="Your Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mb-5 rounded-xl bg-slate-950 border border-white/10 px-5 py-4 outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full mb-5 rounded-xl bg-slate-950 border border-white/10 px-5 py-4 outline-none resize-none"
          />

          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold flex items-center gap-2">
            Send Message <Send size={18} />
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-3">
            <HelpCircle className="text-purple-300" />
            FAQ
          </h2>

          <div className="space-y-5">
            {faqs.map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-slate-950/70 border border-white/10 p-5">
                <h3 className="font-bold text-cyan-300">{q}</h3>
                <p className="text-slate-400 mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-10 mb-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
        <h2 className="text-4xl font-extrabold mb-4">Visit Our Support Center</h2>
        <p className="text-slate-400 mb-6">
          Our platform support team is available for implementation guidance,
          system walkthroughs and technical support.
        </p>

        <div className="h-72 rounded-3xl bg-slate-950 border border-cyan-400/20 flex items-center justify-center text-slate-400">
          Google Map / Office Location Placeholder
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;