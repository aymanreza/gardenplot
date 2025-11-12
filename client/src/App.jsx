import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ----- LOGIN -----
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await fetch('/api/login', {
        method: "POST",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login Successful');
	localStorage.setItem('token', data.token);
	setUser(data.user);
        setShowSignInModal(false);
        setIsSignedIn(true);
      } else {
        alert(data.error || 'Login Failed');
      }
    } catch (err) {
      alert(err);
    }
  };

  // ----- REGISTER -----
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await fetch('/api/register', {
        method: "POST",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password})
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successful. Please log in.');
        setShowRegisterModal(false);
        setShowSignInModal(true);
      } else {
        alert(data.error || 'Registration Failed');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">
      {/* LOGIN MODAL */}
      {showSignInModal && (
        <div className='modal'>
          <span className='close' onClick={() => setShowSignInModal(false)}>&times;</span>
          <h1>Log In</h1>
          <form className='LogInForm' onSubmit={handleSignIn}>
            <div className='field_pod'>
              <p>Email: </p>
              <input type="email" required></input>
            </div>
            <div className='field_pod'>
              <p>Password: </p>
              <input type="password" required></input>
            </div>
            <button type="submit">submit</button>
          </form>

          <div style={{ textAlign: 'center', color: '#CCE2EA', fontFamily: 'Montserrat', marginTop: '10px' }}>
            Need an account?
            <button
              type="button"
              className="link-btn"
              onClick={() => { setShowSignInModal(false); setShowRegisterModal(true); }}
            >
              Register
            </button>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegisterModal && (
        <div className='modal'>
          <span className='close' onClick={() => setShowRegisterModal(false)}>&times;</span>
          <h1>Register</h1>
          <form className='LogInForm' onSubmit={handleRegister}>
            <div className='field_pod'>
              <p>Name: </p>
              <input type="text" required></input>
            </div>
            <div className='field_pod'>
              <p>Email: </p>
              <input type="email" required></input>
            </div>
            <div className='field_pod'>
              <p>Password: </p>
              <input type="password" required></input>
            </div>
            <button type="submit">create account</button>
          </form>

          <div style={{ textAlign: 'center', color: '#CCE2EA', fontFamily: 'Montserrat', marginTop: '10px' }}>
            Already have an account?
            <button
              type="button"
              className="link-btn"
              onClick={() => { setShowRegisterModal(false); setShowSignInModal(true); }}
            >
              Log in
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="Header">
        <img src="/logo.webp" alt="GardenPlot logo" className="logo"></img>
        <h1 className="Title">GardenPlot</h1>


	{isSignedIn && user
		? <h2 className="hello_user">Hello, {user.name}!</h2>
		: <button className="reglog_cta" onClick={() => setShowSignInModal(true)}> Log In / Register </button>
	}
      </div>

      {/* NAV */}
      <div className='MainNav'>
        <p>weather</p>
        <p>plants</p>
        <p>garden planning</p>
        <p>my plots</p>
      </div>
    </div>
  );
}

export default App;
