"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Primary Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      desc: "Gmail — best for quick replies",
      color: "emerald",
    },
    {
      icon: Mail,
      label: "Institute Email",
      value: personalInfo.emailAlt,
      href: `mailto:${personalInfo.emailAlt}`,
      desc: "IIT-BHU official email",
      color: "teal",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      desc: "Available during IST business hours",
      color: "indigo",
    },
    {
      icon: MapPin,
      label: "Current Location",
      value: "Dept. of Civil Engineering, IIT-BHU, Varanasi – 221005",
      href: null,
      desc: "Correspondence address",
      color: "violet",
    },
  ];

  return (
    <section id="contact" className="section-pad section-alt relative">
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact</h2>
          <div className="divider-line" />
          <p className="text-slate-400 text-sm max-w-xl -mt-4 mb-10">
            Interested in research collaboration, academic enquiries, or speaking invitations?
            Send a message directly — it arrives in my inbox instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactCards.map(({ icon: Icon, label, value, href, desc, color }) => (
              <div key={label} className={`glass-card p-5 border-l-2 border-l-${color}-500/50`}>
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={`text-${color}-400`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className={`text-sm text-white font-medium hover:text-${color}-400 transition-colors break-all`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white font-medium leading-relaxed">{value}</p>
                    )}
                    <p className="text-[11px] text-slate-600 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Availability note */}
            <div className="glass-card p-5 bg-emerald-500/5 border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">Open to Collaboration</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Currently a JRF at IIT-BHU and open to research collaborations, post-doctoral
                positions, and academic roles in Geography, Remote Sensing & Environmental Sciences.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={52} className="text-emerald-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Message Delivered!</h4>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Your message has been sent directly to Dr. Sourav Bhadwal. Expect a reply within 1–2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Dr. Jane Smith"
                        className="form-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="jane@university.edu"
                        className="form-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Subject</label>
                    <input
                      type="text"
                      placeholder="Research Collaboration Enquiry"
                      className="form-input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      className="form-input resize-none"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
                    >
                      <AlertCircle size={16} className="flex-shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600
                      disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl
                      transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 text-sm"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-600 text-center">
                    Message is sent directly to{" "}
                    <span className="text-emerald-500 font-medium">{personalInfo.email}</span> via secure SMTP.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
