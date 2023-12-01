//ServerCom.jsx
import axios from "axios";
import { message } from "antd";


// const apiUrl = 'http://127.0.0.1:3000/api'
const apiUrl = '/api'

function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}


export const handleServerLogin = async (dispatch, formData, navigate) => {
  const loadingMessage = showMessage('loading', 'Logging in ...', 0);
  try {
    const response = await axios.post(`${apiUrl}/login`, formData);
    if (response.status == 200) {
      // console.log(response.data)
      dispatch(login(response.data));
      showMessage('success', 'Logged in successfully', 1);
      navigate('/dashboard');
    } else {
      showMessage('error', 'Login failed. Please try again .', 1);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      showMessage('error', error.response.data.error);
    } else {
      showMessage('error', 'server error. Please try again later.');
    }
  } finally {
    loadingMessage();
  }
};