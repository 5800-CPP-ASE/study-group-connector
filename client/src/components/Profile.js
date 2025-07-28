import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [courses, setCourses] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile/update', {
        courses: courses.split(',').map(c => c.trim()),
        availability: availability.split(',').map(a => a.trim())
      }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      navigate('/matches');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <input value={courses} onChange={e => setCourses(e.target.value)} placeholder="Courses (e.g., CS101,MATH202)" required />
      <input value={availability} onChange={e => setAvailability(e.target.value)} placeholder="Availability (e.g., Mon 2-4,Tue 5-7)" required />
      <button type="submit">Save and Find Matches</button>
    </form>
  );
};

export default Profile;