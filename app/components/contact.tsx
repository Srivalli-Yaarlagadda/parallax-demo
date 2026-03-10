"use client";
import { useState } from "react";
import { validateContactForm } from "@/lib/validation";
export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const handleChange = (field: string, value: string) =>
    setForm({ ...form, [field]: value });
  const handleSubmit = () => {
    const validationErrors = validateContactForm(form);
setErrors({ ...validationErrors });   
 if (!Object.keys(validationErrors).length)
      console.log("Form Submitted", form);
  };
  const inputStyle = (field: string) =>
    `w-full border-b bg-transparent text-black py-2 px-1 placeholder-transparent
     focus:outline-none transition mb-4 ${
       errors[field]
         ? "border-red-500 focus:border-red-500"
         : "border-gray-400 focus:border-brown-600"
     }`;
  const textareaStyle = (field: string) =>
    `w-full border rounded-md bg-transparent p-2 resize-none mb-4
     focus:outline-none transition overflow-hidden ${
       errors[field]
         ? "border-red-500 focus:border-red-500"
         : "border-gray-400 focus:border-brown-600"
     }`;
  const renderInput = (
    label: string,
    field: keyof typeof form,
    type = "text"
  ) => (
    <>
      <label className="text-black mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={inputStyle(field)}
      />
      {errors[field] && (
        <p className="text-red-500 text-sm -mt-3 mb-4">
          {errors[field]}
        </p>
      )}
    </>);
  return (
    <section className="w-full bg-[#f5eee6] py-8 lg:py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-black text-center mb-12 font-serif text-4xl">
          CONTACT US
        </h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-12 lg:gap-24">
          {/* LEFT */}
          <div className="flex-1 flex flex-col">
            {renderInput("Name", "name")}
            {renderInput("Contact Number", "contact")}
            {renderInput("E Mail", "email", "email")}
          </div>
          {/* RIGHT */}
          <div className="flex-1 flex flex-col">
            <label className="text-black mb-10 md:mb-8 font-medium">
              Send Message
            </label>
            <textarea
              rows={4}
              maxLength={500}
              value={form.message}
              onChange={(e) => {
                handleChange("message", e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              className={textareaStyle("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm -mt-3 mb-4">
                {errors.message}
              </p>
            )}
            <div className="mt-4 flex justify-center md:justify-end">
              <button
                onClick={handleSubmit}
                className="w-[120px] py-2 rounded-md border border-gray-400 hover:bg-black hover:text-white transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}