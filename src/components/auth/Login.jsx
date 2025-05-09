import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    if (formData.email && formData.password) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue to-gold flex items-center justify-center">
      <div className="relative w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <img src="/logo.png" alt="Daffy Logo" className="w-32 h-32 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-center text-primary-blue mb-6">Welcome to Daffy!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="University Email"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-gold"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-gold"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full p-3 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full p-3 bg-white border rounded-lg flex items-center justify-center space-x-2"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
          <p className="text-center text-gold">
            New to Daffy? <a href="/signup" className="underline">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
}