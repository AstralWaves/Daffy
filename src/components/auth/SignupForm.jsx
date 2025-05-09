import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    university: {
      name: '',
      department: ''
    },
    alumniInfo: {
      graduationYear: '',
      batch: '',
      currentCompany: '',
      position: ''
    },
    teacherInfo: {
      department: '',
      designation: '',
      joinedYear: '',
      specialization: '',
      facultyId: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="text-white">Email</label>
              <input
                type="email"
                name="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="name" className="text-white">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="text-white">Role</label>
              <select
                name="role"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* University Information */}
            <div>
              <label htmlFor="university.name" className="text-white">University Name</label>
              <input
                type="text"
                name="university.name"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={formData.university.name}
                onChange={handleChange}
              />
            </div>

            {/* Alumni Specific Fields */}
            {formData.role === 'alumni' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Alumni Information</h3>
                <div>
                  <label htmlFor="alumniInfo.graduationYear" className="text-white">Graduation Year</label>
                  <input
                    type="number"
                    name="alumniInfo.graduationYear"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.alumniInfo.graduationYear}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="alumniInfo.batch" className="text-white">Batch</label>
                  <input
                    type="text"
                    name="alumniInfo.batch"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.alumniInfo.batch}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="alumniInfo.currentCompany" className="text-white">Current Company</label>
                  <input
                    type="text"
                    name="alumniInfo.currentCompany"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.alumniInfo.currentCompany}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Teacher Specific Fields */}
            {formData.role === 'teacher' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Teacher Information</h3>
                <div>
                  <label htmlFor="teacherInfo.department" className="text-white">Department</label>
                  <input
                    type="text"
                    name="teacherInfo.department"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.teacherInfo.department}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="teacherInfo.facultyId" className="text-white">Faculty ID</label>
                  <input
                    type="text"
                    name="teacherInfo.facultyId"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.teacherInfo.facultyId}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="teacherInfo.designation" className="text-white">Designation</label>
                  <input
                    type="text"
                    name="teacherInfo.designation"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.teacherInfo.designation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="text-white">Password</label>
              <input
                type="password"
                name="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;