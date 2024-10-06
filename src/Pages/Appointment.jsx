import React, { useState, useContext } from 'react';
import './Appointment.css'; // Ensure this import is correct
import { Context } from '../context/Context'; // Correctly import the context

const Appointment = () => {
  const { appointments, setAppointments } = useContext(Context); // Access appointments from context

  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    date: '',
    time: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null); // State for editing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      id: Date.now(), // Simple ID generation
      ...formData,
      status: 'Scheduled',
    };

    if (editingAppointment) {
      // Update the existing appointment
      setAppointments(appointments.map(app => (app.id === editingAppointment.id ? newAppointment : app)));
      setEditingAppointment(null); // Reset editing state
    } else {
      // Add new appointment
      setAppointments([...appointments, newAppointment]); // Add appointment to context
    }
    
    console.log("Appointment Details:", newAppointment);

    // Clear form fields
    setFormData({
      name: '',
      doctor: '',
      date: '',
      time: '',
    });

    // Here you would trigger the reminder function, ideally on a backend
    sendReminder(newAppointment);
  };

  const sendReminder = (appointment) => {
    // Simulate sending a reminder. You can implement actual email/SMS functionality on the backend.
    console.log(`Reminder sent for appointment: ${appointment.date} at ${appointment.time}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter(app =>
    app.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setAppointments(appointments.filter(app => app.id !== id)); // Delete appointment
  };

  const handleEdit = (app) => {
    setEditingAppointment(app); // Set appointment to edit
    setFormData({
      name: app.name,
      doctor: app.doctor,
      date: app.date,
      time: app.time,
    });
  };

  return (
    <div className="Appointment">
      <h2>{editingAppointment ? 'Edit Appointment' : 'Schedule an Appointment'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Doctor:
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Doe">Dr. Doe</option>
            {/* Add more doctor options here */}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}</button>
      </form>

      <h2>Your Appointments</h2>
      <input
        type="text"
        placeholder="Search by doctor name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h3>Upcoming Appointments</h3>
      {filteredAppointments.filter(app => new Date(app.date) > new Date()).length === 0 ? (
        <p>No upcoming appointments found.</p>
      ) : (
        filteredAppointments.filter(app => new Date(app.date) > new Date()).map(app => (
          <div key={app.id}>
            <p>{`${app.date} at ${app.time} with ${app.doctor}`}</p>
            <button onClick={() => handleEdit(app)}>Reschedule</button>
            <button onClick={() => handleDelete(app.id)}>Delete</button>
          </div>
        ))
      )}

      <h3>Past Appointments</h3>
      {filteredAppointments.filter(app => new Date(app.date) <= new Date()).length === 0 ? (
        <p>No past appointments found.</p>
      ) : (
        filteredAppointments.filter(app => new Date(app.date) <= new Date()).map(app => (
          <div key={app.id}>
            <p>{`${app.date} at ${app.time} with ${app.doctor} - ${app.status}`}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointment;
