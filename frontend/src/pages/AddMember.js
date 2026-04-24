import { useState } from 'react';
import axios from 'axios';

function AddMember() {
  const [data, setData] = useState({
    name: '',
    role: '',
    email: '',
    rollNumber: '',
    project: '',
    certificate: '',
    internship: '',
    about: '',
    hobbies: ''
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // basic fields
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('email', data.email);
    formData.append('image', image);

    // new fields
    formData.append('rollNumber', data.rollNumber);
    formData.append('project', data.project);
    formData.append('certificate', data.certificate);
    formData.append('internship', data.internship);
    formData.append('about', data.about);

    // convert hobbies to array
    formData.append('hobbies', JSON.stringify(data.hobbies.split(',')));

    try {
      await axios.post('http://localhost:5000/api/members', formData);
      alert("Member Added Successfully");

      // clear form
      setData({
        name: '',
        role: '',
        email: '',
        rollNumber: '',
        project: '',
        certificate: '',
        internship: '',
        about: '',
        hobbies: ''
      });
      setImage(null);

    } catch (error) {
      console.log(error);
      alert("Error adding member");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Member</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input name="name" placeholder="Name" value={data.name} onChange={handleChange} />
        <input name="role" placeholder="Role" value={data.role} onChange={handleChange} />
        <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
        <input name="rollNumber" placeholder="Roll Number" value={data.rollNumber} onChange={handleChange} />

        <input name="project" placeholder="Project" value={data.project} onChange={handleChange} />
        <input name="certificate" placeholder="Certificate" value={data.certificate} onChange={handleChange} />
        <input name="internship" placeholder="Internship" value={data.internship} onChange={handleChange} />

        <textarea name="about" placeholder="About" value={data.about} onChange={handleChange}></textarea>

        <input name="hobbies" placeholder="Hobbies (comma separated)" value={data.hobbies} onChange={handleChange} />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Add Member</button>

      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: 'auto'
  }
};

export default AddMember;