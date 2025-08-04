import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [unread, setUnread] = useState(0);  // For notifications

  // effect hook to fetch matches and unreaad count 
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('/api/matches', { headers: { 'x-auth-token': localStorage.getItem('token') } });
        setMatches(res.data);
      } catch (err) {
        alert('Failed to fetch matches');
      }
    };
    const fetchUnread = async () => {
      try {
        const res = await axios.get('/api/chat/unread', { headers: { 'x-auth-token': localStorage.getItem('token') } });
        setUnread(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatches();
    fetchUnread();
  }, []);

  // generate unique id room id for chat
  const getRoomId = (matchId) => {
    const currentUserId = localStorage.getItem('userId');
    return [currentUserId, matchId].sort().join('_');
  };

  // render matches list
  return (
    <div>
      <h2>Your Matches {unread > 0 && <span className="notification">(New messages!)</span>}</h2>
      {matches.length === 0 ? (
        <p>No matches found. Update your profile or invite friends!</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              {match.email} - Courses: {match.courses.join(', ')} - Availability: {match.availability.join(', ')}
              <Link to={`/chat/${getRoomId(match.id)}`}>Chat</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/profile"><button>Update Profile</button></Link>
    </div>
  );
};

export default Matches;