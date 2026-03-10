// lib/validations.ts

export interface ContactForm {
  name: string;
  contact: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  contact?: string;
  email?: string;
  message?: string;
}

export const validateContactForm = (
  form: ContactForm
): FormErrors => {
  const errors: FormErrors = {};

  /* ---------- NAME ---------- */
  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  /* ---------- CONTACT ---------- */
  if (!form.contact.trim()) {
    errors.contact = "Contact number is required";
  } else if (!/^[0-9]{10}$/.test(form.contact)) {
    errors.contact = "Enter valid 10 digit number";
  }

  /* ---------- EMAIL ---------- */
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter valid email address";
  }

  /* ---------- MESSAGE ---------- */
  if (!form.message.trim()) {
    errors.message = "Message is required";
  } else if (form.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};