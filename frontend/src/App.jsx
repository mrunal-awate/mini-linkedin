import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';

function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] text-gray-800 font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white sticky top-0 z-20 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl font-extrabold text-blue-700 tracking-tight cursor-pointer hover:scale-[1.02] transition duration-200"
            onClick={() => navigate('/')}
          >
            MiniLinkedIn
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            {['/', '/register', '/login', '/profile'].map((path, index) => {
              const labels = ['Home', 'Register', 'Login', 'My Profile'];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-700 font-semibold border-b-2 border-blue-700 pb-0.5'
                      : 'text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-500 pb-0.5 transition duration-150'
                  }
                >
                  {labels[index]}
                </NavLink>
              );
            })}
            <button
              onClick={logout}
              className="ml-4 px-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-150"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
