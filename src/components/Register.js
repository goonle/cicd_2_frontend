import axios from 'axios';

function Register() {
  // Handle form submissions
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('https://cicd-2-backend.vercel.app/api/register/', data);
      console.log('Registration success:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <title>Login</title>
      <link rel="stylesheet" type="text/css" href="style.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input type="text" name="username" placeholder="Username" required />
            <input type="text" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;