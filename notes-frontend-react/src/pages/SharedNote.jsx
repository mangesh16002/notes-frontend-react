import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function SharedNote() {
  const { token } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/public/${token}`);
        setNote(res.data);
      } catch (e) {
        setError('Note not found or link expired.');
      }
    }
    load();
  }, [token]);

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
        <Link to="/">← Back to app</Link>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{note.title || '(No title)'}</h2>
        <p>{note.content}</p>
      </div>
      <Link to="/">← Back to app</Link>
    </div>
  );
}
