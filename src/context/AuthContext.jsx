import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if the user already has a valid VIP Wristband (JWT) when the app loads
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('chill_clips_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Ask the Java backend if this token is still valid
        const response = await fetch(`${API_URL}/api/v1/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUser({ email: data.email }); // Token is valid, log them in!
        } else {
          localStorage.removeItem('chill_clips_token'); // Token expired, throw it away
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('chill_clips_token');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // 2. The Sign Up Logic
  const signUp = async (email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');

    // Save the VIP wristband to the browser
    localStorage.setItem('chill_clips_token', data.token);
    setUser({ email: data.email });
    return data;
  };

  // 3. The Sign In Logic
  const signIn = async (email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signin failed');

    // Save the VIP wristband to the browser
    localStorage.setItem('chill_clips_token', data.token);
    setUser({ email: data.email });
    return data;
  };

  // 4. The Sign Out Logic
  const signOut = async () => {
    localStorage.removeItem('chill_clips_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);