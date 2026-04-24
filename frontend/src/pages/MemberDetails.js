import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/members/${id}`)
      .then(res => {
        console.log("DETAIL DATA:", res.data);
        setMember(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // 🟢 SAFE HOBBIES HANDLING
  const hobbiesArray = Array.isArray(member.hobbies)
    ? member.hobbies
    : typeof member.hobbies === 'string'
      ? member.hobbies.split(',').map(h => h.trim())
      : [];

  return (
    <div style={styles.container}>

      {/* 🟢 IMAGE */}
      <img
        src={
          member.image
            ? `http://localhost:5000/uploads/${member.image}`
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="member"
        style={styles.image}
      />

      {/* 🟢 BASIC INFO */}
      <h2>{member.name}</h2>
      <p style={styles.role}>
        {member.role || member.degree || "N/A"}
      </p>
      <p>{member.email || "N/A"}</p>

      {/* 🟢 DETAILS */}
      <div style={styles.card}>
        <p><b>Roll Number:</b> {member.rollNumber || member.roll || "N/A"}</p>
        <p><b>Project:</b> {member.project || "N/A"}</p>
        <p><b>Certificate:</b> {member.certificate || "N/A"}</p>
        <p><b>Internship:</b> {member.internship || "N/A"}</p>
        <p><b>About:</b> {member.about || member.aboutYourAim || "N/A"}</p>
      </div>

      {/* 🟢 HOBBIES */}
      <div>
        <h3>Hobbies</h3>

        {hobbiesArray.length > 0 ? (
          hobbiesArray.map((h, i) => (
            <span key={i} style={styles.tag}>{h}</span>
          ))
        ) : (
          <p>No hobbies added</p>
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },

  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '15px'
  },

  role: {
    color: '#2563eb',
    fontWeight: 'bold'
  },

  card: {
    textAlign: 'left',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  },

  tag: {
    background: '#2563eb',
    color: 'white',
    padding: '6px 12px',
    margin: '5px',
    borderRadius: '5px',
    display: 'inline-block'
  }
};

export default MemberDetails;