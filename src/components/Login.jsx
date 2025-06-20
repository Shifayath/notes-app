import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => onLogin(user))
      .catch(err => alert(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => onLogin(result.user))
      .catch(err => alert(err.message));
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn primary" onClick={handleEmailLogin}>Login with Email</button>
      <button className="btn secondary" onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}
