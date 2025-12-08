import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import type { ObjectId } from 'mongoose';

// Interfaces
interface JwtPayload {
  user: {
    id: string | ObjectId;
    name: string;
    role: string;
    email: string;
    session: {
      token: string;
    };
  };
}
interface DecodedUser {
  token: string;
  session_token: string;
  user_id: string | ObjectId | null;
  name: string;
  email: string;
  role: string;
}

// Local user store (no Vue refs)
let user = {
  id: null as string | ObjectId | null,
  name: '',
  role: '',
  email: '',
  session_token: ''
};

const getTokenValues = (): DecodedUser | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    user = {
      id: decodedToken.user.id,
      name: decodedToken.user.name,
      role: decodedToken.user.role,
      email: decodedToken.user.email,
      session_token: decodedToken.user.session.token
    };

    return {
      token,
      session_token: user.session_token,
      user_id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const setAxiosHeaders = (contentType: string | null = null) => {
  const tokens = getTokenValues();

  if (tokens?.token) {
    axios.defaults.headers.common['x-auth-token'] = tokens.token;
  }

  if (tokens?.session_token) {
    axios.defaults.headers.common['x-session-token'] = tokens.session_token;
  }

  if (contentType) {
    axios.defaults.headers.common['Content-Type'] = contentType;
  } else {
    delete axios.defaults.headers.common['Content-Type'];
  }
};

const resetTokens = (newToken: string) => {
  localStorage.setItem('token', newToken);
  setAxiosHeaders();
};

// Run once on import
setAxiosHeaders();

export { getTokenValues, setAxiosHeaders, resetTokens };