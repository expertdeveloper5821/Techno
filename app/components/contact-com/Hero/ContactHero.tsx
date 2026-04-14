"use client";

import { useState } from "react";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { sendContactForm } from "@/app/lib/contact-api";

const SERVICE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "ui-ux", label: "UI / UX Design" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
] as const;

const COUNTRY_CODES = [
  { code: "+91", label: "IN " },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK " },
  { code: "+61", label: "AU " },
  { code: "+971", label: "AE" },
  { code: "+65", label: "SG" },
  { code: "+49", label: "DE" },
] as const;

function splitFullName(full: string): { firstName: string; lastName: string } {
  const t = full.trim();
  if (!t) return { firstName: "", lastName: "" };
  const space = t.indexOf(" ");
  if (space === -1) return { firstName: t, lastName: "" };
  return {
    firstName: t.slice(0, space).trim(),
    lastName: t.slice(space + 1).trim(),
  };
}

export default function ContactHero() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [countryCode, setCountryCode] = useState<(typeof COUNTRY_CODES)[number]["code"]>("+91");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [message, setMessage] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    const { firstName, lastName } = splitFullName(fullName);
    if (!firstName || !email || !service || !agreePrivacy) {
      setSubmitStatus("error");
      return;
    }

    const phone = phoneLocal.trim() ? `${countryCode} ${phoneLocal.trim()}` : "";
    const serviceLabel =
      SERVICE_OPTIONS.find((o) => o.value === service)?.label ?? service;
    const meta = [
      company.trim() ? `Company: ${company.trim()}` : null,
      `Service needed: ${serviceLabel}`,
    ]
      .filter(Boolean)
      .join("\n");
    const fullMessage = meta ? `${meta}\n\n${message.trim()}` : message.trim();

    setIsSubmitting(true);
    try {
      const result = await sendContactForm({
        firstName,
        lastName: lastName || "-",
        email: email.trim(),
        phone,
        message: fullMessage.trim() || "—",
        agreePrivacy,
      });
      if (result.ok) {
        setSubmitStatus("success");
        setFullName("");
        setEmail("");
        setCompany("");
        setService("");
        setPhoneLocal("");
        setMessage("");
        setAgreePrivacy(false);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <section
      className="relative overflow-hidden  pt-40 pb-10 sm:pt-58 sm:pb-40  bg-black  text-white  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/contact/contact-hero.png')" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#0094DB]/25 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-0 h-[380px] w-[380px] rounded-full bg-[#036C9F]/30 blur-[90px]" />
        <div className="absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#0ea5e9]/15 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full   px-4 sm:px-6 lg:px-6">
        <div className="overflow-hidden rounded-xl border border-white/20 bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="grid lg:grid-cols-2 rounded-l-xl">
            {/* Left */}
            <div className="flex flex-col justify-center gap-8  p-8 sm:p-10 lg:p-12 bg-white/10 backdrop-blur-md border border-white/20  rounded-l-xl  shadow-lg">
              <div>
                <h1 className="font-inter text-[24px] font-medium leading-[40px] tracking-[1%] text-[#FFFFFF] sm:text-3xl lg:text-[32px] lg:leading-tight">
                  Insights That Help You Build Better Systems
                </h1>
                <p className="mt-4 text-base leading-[34px] tracking-[1%] text-[#FFFFFF] sm:text-xl">
                  We share practical ideas, real project learnings, and simple
                  solutions to business and technology problems we solve while
                  working with clients.
                </p>
              </div>

              <ul className="space-y-5 text-sm text-[#e5e5e5] sm:text-base">
                <li className="flex gap-3">
                  <HiOutlineMapPin
                    className="mt-0.5 h-6 w-6 shrink-0 "
                    aria-hidden
                  />
                  <span className="text-[#FFFFFF] tracking-[1%] leading-[28px] text-lg">
                    1st floor, Nexa Square, C-209/B, 
                    <br />
                    Phase 8B, Sec 74, Mohali,
                    
                    Punjab.
                  </span>
                </li>
                <li className="flex gap-3">
                  <HiOutlineEnvelope
                    className="mt-0.5 h-6 w-6 shrink-0 "
                    aria-hidden
                  />
                  <a
                    href="mailto:info@technogetic.com"
                    className="text-[#FFFFFF] tracking-[1%] leading-[20px] text-lg "
                  >
                    info@technogetic.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <HiOutlinePhone
                    className="mt-0.5 h-6 w-6 shrink-0 "
                    aria-hidden
                  />
                  <span>
                    <a href="tel:+919779992829" className="text-[#FFFFFF] tracking-[1%] leading-[20px] text-lg ">
                      +91 97799 92829
                    </a>
                    <span className="text-white/40"> , </span>
                    <a href="tel:+919779992829" className="text-[#FFFFFF] tracking-[1%] leading-[20px] text-lg">
                      +91 97799 92829
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* Right — form */}
            <div className="bg-[#FFFFFFE5] p-8 text-[#111827] sm:p-10 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-fullname" className="text-sm leading-[14px] font-medium text-[#000000]">
                      Full name<span className="text-[#000000] ">*</span>
                    </label>
                    <input
                      id="contact-fullname"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Fullname"
                      autoComplete="name"
                      className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-sm font-medium text-[#000000] leading-[20px]  ">
                      Email<span className="text-[#000000] ">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      autoComplete="email"
                      className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="text-sm font-medium text-[#000000] leading-[20px]  ">
                      Company Name (optional)
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="company name"
                      autoComplete="organization"
                     className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-service" className="text-sm font-medium text-[#000000] leading-[20px]  ">
                      Service Needed<span className="text-[#000000] ">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                     className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option
                          key={opt.label + opt.value}
                          value={opt.value}
                          disabled={opt.value === ""}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-[#000000] leading-[20px]  ">Phone number</span>
                  <div className="flex gap-2 sm:gap-3">
                    <select
                      id="contact-country-code"
                      name="countryCode"
                      value={countryCode}
                      onChange={(e) =>
                        setCountryCode(
                          e.target.value as (typeof COUNTRY_CODES)[number]["code"]
                        )
                      }
                      className=" shrink-0 rounded-lg border border-[#0000004D] bg-[#1E1E1E08]  py-2.5 text-sm text-gray-800 outline-none px-2"
                    >
                      {COUNTRY_CODES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}

                    </select>
                    <input
                      id="contact-phone"
                      name="phoneLocal"
                      type="tel"
                      value={phoneLocal}
                      onChange={(e) => setPhoneLocal(e.target.value)}
                      placeholder="000-0000"
                      autoComplete="tel-national"
                      className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-[#000000] leading-[20px]  ">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave us a message..."
                   className="w-full rounded-lg border border-[#0000004D] bg-[#1E1E1E08] px-3 py-2.5 text-sm text-gray-900 outline-none  placeholder:text-[#797979] "
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-[6px] border-[#000000] text-[#0094DB] "
                  />
                  <span className=" text-[#000000] text-base leading-6 " >You agree to our friendly privacy policy.</span>
                </label>

                {submitStatus === "error" && (
                  <p className="text-sm text-red-600" role="alert">
                    Please fill required fields and accept the privacy policy.
                  </p>
                )}
                {submitStatus === "success" && (
                  <p className="text-sm text-green-700" role="status">
                    Thank you — we&apos;ll get back to you shortly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[linear-gradient(237.1deg,#35A9F4_24.76%,#0088FF_69.64%)] py-3 text-center text-sm font-semibold text-[#000000] transition hover:bg-[#0284c7] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting…" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
