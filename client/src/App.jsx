import { useEffect, useState } from 'react';
import './App.css';

function getNameFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || payload.email || null;
  } catch {
    return null;
  }
}

function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem('token'));
  const [displayName, setDisplayName] = useState(getNameFromToken());

  useEffect(() => {
    setDisplayName(getNameFromToken());
  }, [isSignedIn]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) localStorage.setItem('token', data.token);
        setIsSignedIn(true);
        setShowSignInModal(false); // close after success
        alert('Login Successful');
      } else {
        alert(data.error || 'Login Failed');
      }
    } catch (err) {
      alert(err?.message || 'Network error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (!name) return alert('Please enter your name');
    if (password.length < 6) return alert('Password must be at least 6 characters');
    if (password !== confirm) return alert('Passwords do not match');

    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsSignedIn(true);
          setShowRegisterModal(false);
          alert('Account created! You are signed in.');
        } else {
          alert('Account created! Please log in.');
          setShowRegisterModal(false);
          setShowSignInModal(true);
        }
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert(err?.message || 'Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    setDisplayName(null);
  };

  return (
    <div className="App">

      {/* Log In Modal */}
      {showSignInModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <span className="close" onClick={() => setShowSignInModal(false)} aria-label="Close">&times;</span>
          <h1>Log In</h1>
          <form className="LogInForm" onSubmit={handleSignIn}>
            <div className="field_pod">
              <p>Email: </p>
              <input name="email" type="email" required />
            </div>
            <div className="field_pod">
              <p>Password: </p>
              <input name="password" type="password" required />
            </div>
            <button type="submit">submit</button>
          </form>
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="linklike"
              onClick={() => {
                setShowSignInModal(false);
                setShowRegisterModal(true);
              }}
            >
              Create one
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <span className="close" onClick={() => setShowRegisterModal(false)} aria-label="Close">&times;</span>
          <h1>Create Account</h1>
          <form className="RegisterForm" onSubmit={handleRegister}>
            <div className="field_pod">
              <p>Name: </p>
              <input name="name" type="text" placeholder="Jane Doe" required />
            </div>
            <div className="field_pod">
              <p>Email: </p>
              <input name="email" type="email" placeholder="jane@example.com" required />
            </div>
            <div className="field_pod">
              <p>Password: </p>
              <input name="password" type="password" required />
            </div>
            <div className="field_pod">
              <p>Confirm: </p>
              <input name="confirm" type="password" required />
            </div>
            <button type="submit">Create account</button>
          </form>
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            Already have an account?{' '}
            <button
              type="button"
              className="linklike"
              onClick={() => {
                setShowRegisterModal(false);
                setShowSignInModal(true);
              }}
            >
              Log in
            </button>
          </div>
        </div>
      )}

      <div className="Header">
        <img src="/logo.webp" alt="GardenPlot logo" className="logo" />
        <h1 className="Title">GardenPlot</h1>
        {!isSignedIn ? (
          <button className="reglog_cta" onClick={() => setShowSignInModal(true)}> Log In / Register </button>
        ) : (
          <button className="reglog_cta" onClick={handleLogout}>
            {displayName ? `Log Out (${displayName})` : 'Log Out'}
          </button>
        )}
      </div>

      <div className="MainNav">
        <p>weather</p>
        <p>plants</p>
        <p>garden planning</p>
        <p>my plots</p>
      </div>
    </div>
  );
}

export default App;


/*
export default function App() {
  const [health, setHealth] = useState(null);
  const [tables, setTables] = useState([]);
  const [picked, setPicked] = useState('');
  const [rows, setRows] = useState([]);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);
  const [loadingRows, setLoadingRows] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoadingHealth(true);
        const r = await fetch('/api/healthz');
        setHealth(await r.json());
      } catch (e) {
        setError(`healthz: ${e.message}`);
      } finally {
        setLoadingHealth(false);
      }
    })();

    (async () => {
      try {
        setLoadingTables(true);
        const r = await fetch('/api/tables');
        setTables(await r.json());
      } catch (e) {
        setError(`tables: ${e.message}`);
      } finally {
        setLoadingTables(false);
      }
    })();
  }, []);

  async function loadRows(name) {
    setPicked(name);
    setRows([]);
    try {
      setLoadingRows(true);
      const r = await fetch(`/api/tables/${encodeURIComponent(name)}/rows?limit=20`);
      const data = await r.json();
      setRows(data);
    } catch (e) {
      setError(`rows: ${e.message}`);
    } finally {
      setLoadingRows(false);
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', maxWidth: 900, margin: '24px auto', padding: '0 16px' }}>
      <h1 style={{ marginTop: 0 }}>Garden/Web App — UI ↔ API</h1>

      {error && <div style={{ color: '#b00020', marginBottom: 12 }}>Error: {error}</div>}

      <Section title="Health">
        {loadingHealth ? 'Loading…' : <pre style={{ margin: 0 }}>{JSON.stringify(health, null, 2)}</pre>}
      </Section>

      <Section title="Tables">
        {loadingTables ? 'Loading…' : (
          tables.length === 0 ? <div>No tables found.</div> : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tables.map(t => (
                <button
                  key={t}
                  onClick={() => loadRows(t)}
                  style={{
                    cursor: 'pointer',
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    background: picked === t ? '#eef' : 'white'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          )
        )}
      </Section>

      <Section title={picked ? `Rows: ${picked}` : 'Rows'}>
        {picked === '' ? <div>Pick a table above.</div> :
          loadingRows ? 'Loading…' :
          rows.length === 0 ? <div>No rows (or table is empty).</div> :
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  {Object.keys(rows[0]).map(k => (
                    <th key={k} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px 8px' }}>
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    {Object.keys(rows[0]).map(k => (
                      <td key={k} style={{ borderBottom: '1px solid #f0f0f0', padding: '6px 8px' }}>
                        {String(r[k])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </Section>
    </div>
  );
}*/

