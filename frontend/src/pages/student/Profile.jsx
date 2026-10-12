
import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/student.service';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await studentService.getProfile();

        if (response?.success && response?.data) {
          setProfile(response.data);
        } else {
          throw new Error(
            response?.message || 'Unable to fetch student profile.'
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          'Something went wrong while loading your profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(' ');

  const initials = fullName
    ? fullName
        .split(' ')
        .filter(Boolean)
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'S';

  const formatDate = (date) => {
    if (!date) return 'Not available';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Not available';
    }

    return parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  const displayValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Not available';
    }

    return value;
  };

  const Detail = ({ label, value }) => (
    <div>
      <p className="text-slate-300 text-xs mb-1">{label}</p>
      <p className="text-sm font-medium">{displayValue(value)}</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">
          Your internship profile and academic details
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          Loading your profile...
        </div>
      ) : error ? (
        <div
          className="bg-white rounded-2xl border border-red-200 p-6 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      ) : profile ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Avatar & Progress */}
          <div className="col-span-1 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-2xl font-serif font-bold mb-5">
              {initials}
            </div>

            <h2 className="text-lg font-bold font-serif">
              {fullName || 'Student'}
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              {displayValue(profile.enrollmentNumber)}
              {' · '}
              {displayValue(profile.branch || profile.course)}
            </p>

            <p className="text-slate-300 text-xs mt-1">
              {displayValue(profile.semester)}
            </p>

            <div className="w-full mt-8">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Internship Progress</span>
                <span className="text-violet-600 font-semibold">
                  Not available
                </span>
              </div>
              <div
                className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
                aria-label="Internship progress unavailable"
              >
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Detail label="Gender" value={null} />
                <Detail label="DOB" value={null} />
                <Detail label="Mobile" value={profile.phone} />
                <Detail label="Email" value={profile.email} />
              </div>
            </div>

            {/* Internship Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">
                Internship Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Detail label="Batch" value={null} />
                <Detail label="Mentor" value={null} />
                <Detail
                  label="Joining Date"
                  value={formatDate(profile.joiningDate)}
                />
                <Detail label="End Date" value={null} />
                <Detail label="CGPA" value={null} />
                <Detail label="Status" value={profile.status} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-500">
          No profile information available.
        </div>
      )}
    </div>
  );
};

export default Profile;
