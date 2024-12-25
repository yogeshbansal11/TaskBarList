// import React, { useState } from 'react';

// const UpdateUsername = () => {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username) {
//       setMessage(`Username updated to: ${username}`);
//     } else {
//       setMessage('Please enter a valid username');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Update Username</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           value={username}
//           onChange={handleUsernameChange}
//           placeholder="Enter new username"
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>Update</button>
//       </form>
//       {message && <p style={styles.message}>{message}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: '100%',
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: '24px',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     padding: '10px',
//     margin: '10px 0',
//     border: '2px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '16px',
//     transition: 'border-color 0.3s',
//   },
//   inputFocus: {
//     borderColor: '#007bff',
//     outline: 'none',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   buttonHover: {
//     backgroundColor: '#0056b3',
//   },
//   message: {
//     marginTop: '20px',
//     fontSize: '16px',
//     color: '#333',
//   }
// };

// export default UpdateUsername;



import React, { useState } from 'react';
import axios from 'axios';

const UpdateUsername = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username) {
      try {
        const response = await axios.post('http://localhost:5050/auth/username', { newusername : username,userId });
        
        // Assuming the API returns a success message or status
        alert(`Username updated !!`)
      } catch (error) {
        setMessage('An error occurred while updating the username.');
        console.error(error); // Log error for debugging purposes
      }
    } else {
      setMessage('Please enter a valid username');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Username</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter new username"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};

export default UpdateUsername;
