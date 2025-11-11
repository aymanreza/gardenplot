import { useEffect, useState } from 'react';
import './App.css';

function getNameFromToken() {
  const token = localStorage.getItem('token');
  if(!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1])).name;
  } catch {
    return null;
  }
}

function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
	mode: 'cors',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify({email, password})
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login Successful');
        setShowSignInModal(true);
	setIsSignedIn(true);
      } else {
        alert(data.error || 'Login Failed');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">

      {showSignInModal && (
        <div className='modal'>
          <span className='close' onClick = {() => setShowSignInModal(false)}>&times;</span>
          <h1>Log In</h1>
          <form className='LogInForm' onSubmit={handleSignIn}>
            <div className='field_pod'>
              <p>Email: </p>
              <input type="email"></input>
            </div>
            <div className='field_pod'>
              <p>Password: </p>
              <input type="password"></input>
            </div>
            <button type="submit">submit</button>
          </form>
        </div>
      )}

      <div className="Header">
        <img src="/logo.webp" alt="GardenPlot logo" className="logo"></img>
        <h1 className="Title">GardenPlot</h1>
        <button className="reglog_cta" onClick={() => setShowSignInModal(true)}> Log In / Register </button>
      </div>

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

