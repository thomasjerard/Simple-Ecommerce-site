import React, { useState } from 'react';
import { auth, db } from '../config/config'; // Import the necessary Firebase configurations

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      // Create user with email and password using Firebase authentication
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Save additional user details to Firestore
      await db.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        username: username,
      });

      // Clear the form fields after signup
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
