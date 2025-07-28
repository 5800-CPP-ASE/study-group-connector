import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('/api/matches', { headers: { 'x-auth-token': localStorage.getItem('token') } });
        setMatches(res.data);
      } catch (err) {
        alert('Failed to fetch matches');
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Your Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found. Update your profile or invite friends!</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              {match.email} - Courses: {match.courses.join(', ')} - Availability: {match.availability.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Matches;