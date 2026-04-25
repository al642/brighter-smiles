import { useEffect, useMemo, useState } from 'react';
import { contactDetails } from '../data/contactdetails.js';
import { services } from '../data/services.js';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  age: '',
  date: '',
  service: services[0]?.title || '',
  address: '',
  note: ''
};

function buildAppointmentMessage(formState) {
  return [
    'Hello Brighter Smiles, I would like to make an appointment.',
    `Name: ${formState.name}`,
    `Email: ${formState.email}`,
    `Phone: ${formState.phone}`,
    formState.age ? `Age: ${formState.age}` : null,
    `Preferred date: ${formState.date}`,
    `Service: ${formState.service}`,
    formState.address ? `Address: ${formState.address}` : null,
    formState.note ? `Notes: ${formState.note}` : null
  ]
    .filter(Boolean)
    .join('\n');
}

export function AppointmentModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const isReady = useMemo(
    () => formState.name && formState.phone && formState.date && formState.service,
    [formState]
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-is-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-is-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isReady) {
      return;
    }

    const message = encodeURIComponent(buildAppointmentMessage(formState));
    window.open(`https://wa.me/256700726076?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const emailHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
    'Appointment request'
  )}&body=${encodeURIComponent(buildAppointmentMessage(formState))}`;

  return (
    <div className="appointment-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="appointment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="appointment-close" onClick={onClose} aria-label="Close appointment form">
          ×
        </button>

        <div className="appointment-copy">
          <p className="eyebrow">Make appointment</p>
          <h2 id="appointment-title">Tell us what you need and the team will confirm your visit.</h2>
          <p>
            Share the essentials below, then send the request through WhatsApp or email using the
            clinic contact details from Lucent Smiles.
          </p>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input name="name" value={formState.name} onChange={updateField} required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={formState.email} onChange={updateField} />
          </label>

          <label>
            Phone Number
            <input name="phone" value={formState.phone} onChange={updateField} required />
          </label>

          <label>
            Age
            <input name="age" type="number" min="1" value={formState.age} onChange={updateField} />
          </label>

          <label>
            Appointment Date
            <input name="date" type="date" value={formState.date} onChange={updateField} required />
          </label>

          <label>
            Appointment Service
            <select name="service" value={formState.service} onChange={updateField} required>
              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
              <option>Emergency Services</option>
              <option>Teeth Whitening</option>
              <option>Root Canal Therapy</option>
            </select>
          </label>

          <label className="appointment-field-wide">
            Address
            <input name="address" value={formState.address} onChange={updateField} />
          </label>

          <label className="appointment-field-wide">
            Notes
            <textarea name="note" rows="3" value={formState.note} onChange={updateField} />
          </label>

          {submitted && !isReady ? (
            <p className="appointment-error">Please add your name, phone number, date, and service.</p>
          ) : null}

          <div className="appointment-actions">
            <button type="submit" className="cta-button">
              Send on WhatsApp
            </button>
            <a className="ghost-button" href={emailHref}>
              Send Email
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
