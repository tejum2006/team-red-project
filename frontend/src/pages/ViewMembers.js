import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => {
        console.log("DATA:", res.data);
        setMembers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // 🟢 DELETE FUNCTION (FIXED)
  const deleteMember = async (id) => {
    try {
      console.log("Deleting:", id);

      await axios.delete(`http://localhost:5000/api/members/${id}`);

      alert("Deleted successfully");

      // update UI
      setMembers((prev) => prev.filter((m) => m._id !== id));

    } catch (err) {
      console.log("Delete error:", err);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>MEET OUR AMAZING TEAM</h2>

      <div style={styles.grid}>
        {members.map((m) => (
          <div key={m._id} style={styles.card}>

            {/* 🟢 IMAGE FIX */}
            <img
              src={
                m.image && m.image !== ""
                  ? `http://localhost:5000/uploads/${m.image}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="member"
              style={styles.image}
            />

            <h3>{m.name}</h3>
            <p>{m.role}</p>

            <div>
              <Link to={`/member/${m._id}`}>
                <button style={styles.viewBtn}>View Details</button>
              </Link>

              <button
                onClick={() => deleteMember(m._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },

  heading: {
    color: '#2563eb',
    marginBottom: '20px'
  },

  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px'
  },

  card: {
    width: '250px',
    height: '330px',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px'
  },

  viewBtn: {
    margin: '5px',
    padding: '8px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },

  deleteBtn: {
    margin: '5px',
    padding: '8px',
    background: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ViewMembers;