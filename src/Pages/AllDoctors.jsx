import React, { useState } from 'react';
import './AllDoctors.css';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. John Smith',
    qualification: 'MD, Cardiology',
    specialization: 'Heart Specialist',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with your image source
  },
  {
    id: 2,
    name: 'Dr. Alice Johnson',
    qualification: 'MD, Dermatology',
    specialization: 'Skin Specialist',
    rating: 4.0,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    name: 'Dr. Robert Brown',
    qualification: 'MD, Neurology',
    specialization: 'Brain Specialist',
    rating: 3.5,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    qualification: 'MD, Pediatrics',
    specialization: 'Child Specialist',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 5,
    name: 'Dr. Michael Wilson',
    qualification: 'MD, Orthopedics',
    specialization: 'Bone Specialist',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 6,
    name: 'Dr. John Smith',
    qualification: 'MD, Cardiology',
    specialization: 'Heart Specialist',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with your image source
  },
  {
    id: 7,
    name: 'Dr. Alice Johnson',
    qualification: 'MD, Dermatology',
    specialization: 'Skin Specialist',
    rating: 4.0,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 8,
    name: 'Dr. Robert Brown',
    qualification: 'MD, Neurology',
    specialization: 'Brain Specialist',
    rating: 3.5,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 9,
    name: 'Dr. Emily Davis',
    qualification: 'MD, Pediatrics',
    specialization: 'Child Specialist',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 10,
    name: 'Dr. Michael Wilson',
    qualification: 'MD, Orthopedics',
    specialization: 'Bone Specialist',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const ITEMS_PER_PAGE = 4;

const DoctorsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(doctorsData.length / ITEMS_PER_PAGE);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDoctors = doctorsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="doctors-page">
      <h1 className="title">Available Doctors</h1>
      <div className="doctors-list">
        {currentDoctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <div className="doctor-info">
              <h2 className="doctor-name">{doctor.name}</h2>
              <p className="doctor-qualification">{doctor.qualification}</p>
              <p className="doctor-specialization">{doctor.specialization}</p>
              <div className="doctor-rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`star ${index < doctor.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">Previous</button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">Next</button>
      </div>
    </div>
  );
};

export default DoctorsPage;
