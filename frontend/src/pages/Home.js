import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TEAM ORANGE</h1>
      <p style={styles.subtitle}>Welcome to the Orange Team Management</p>

      <div style={styles.card}>
        <h3>Manage Team</h3>

        <div style={{ marginTop: '15px' }}>
          <Link to="/add">
            <button style={styles.button}>Add Member</button>
          </Link>

          <Link to="/view">
            <button style={styles.button}>View Members</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #1e293b, #0f172a)',
    color: 'white',
    textAlign: 'center',
    paddingTop: '100px'
  },
  title: {
    fontSize: '40px',
    letterSpacing: '2px'
  },
  subtitle: {
    marginTop: '10px',
    color: '#cbd5e1'
  },
  card: {
    margin: '40px auto',
    padding: '20px',
    width: '300px',
    background: '#1d4ed8',
    borderRadius: '10px'
  },
  button: {
    margin: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Home;