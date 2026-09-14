// import React, { useState } from 'react';
// import { MapPin, Wifi, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

// // Decoded from Plus Code HRX4+28W, Pimpri-Chinchwad, Maharashtra
// const OFFICE_LAT = 18.5976125;
// const OFFICE_LNG = 73.805828125;
// const ALLOWED_RADIUS_METERS = 150;

// // Base URL of your real backend API.
// // Confirmed from app.js: app.use("/api", routes) + router.use("/student", studentRoutes)
// // Backend runs on PORT=5000 (see your .env), so this needs the full
// // origin in dev since the frontend runs on a different port.
// const API_BASE_URL = "http://localhost:5000/api/student";

// function getDistanceMeters(lat1, lng1, lat2, lng2) {
//   const R = 6371000;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLng = ((lng2 - lng1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLng / 2) ** 2;
//   return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// }

// // Sends GPS coordinates to your real backend check-in endpoint.
// // The backend computes WiFi/network verification itself from the
// // request's IP — the frontend only needs to send lat/lng plus the JWT.
// async function submitCheckIn({ latitude, longitude }) {
//   const token = localStorage.getItem("token"); // adjust key name if yours differs
//   const res = await fetch(`${API_BASE_URL}/attendance/check-in`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ latitude, longitude }),
//   });
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok || !data.success) {
//     throw new Error(data.message || "Check-in failed");
//   }
//   return data.data;
// }

// const StepRow = ({ icon: Icon, label, state, detail }) => (
//   <div className="w-full flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
//     <div className="flex items-center gap-3">
//       <Icon className="w-4 h-4 text-slate-500" />
//       <div className="text-left">
//         <p className="text-sm font-medium text-slate-700">{label}</p>
//         {detail && <p className="text-xs text-slate-400">{detail}</p>}
//       </div>
//     </div>
//     {state === 'pending' && <span className="w-4 h-4 rounded-full border-2 border-slate-200" />}
//     {state === 'checking' && <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />}
//     {state === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
//     {state === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
//   </div>
// );

// const MarkAttendance = () => {
//   const [locState, setLocState] = useState('pending'); // pending | checking | success | error
//   const [submitState, setSubmitState] = useState('pending');
//   const [distance, setDistance] = useState(null);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [checkedIn, setCheckedIn] = useState(false);
//   const [running, setRunning] = useState(false);

//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject('Geolocation is not supported by this browser.');
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const dist = getDistanceMeters(latitude, longitude, OFFICE_LAT, OFFICE_LNG);
//           setDistance(Math.round(dist));
//           resolve({ latitude, longitude });
//         },
//         () => reject('Location permission denied or unavailable.'),
//         { enableHighAccuracy: true, timeout: 10000 }
//       );
//     });

//   const handleCheckIn = async () => {
//     setRunning(true);
//     setErrorMsg('');
//     setCheckedIn(false);
//     setLocState('checking');
//     setSubmitState('pending');

//     let locationData;
//     try {
//       locationData = await getLocation();
//       setLocState('success');
//     } catch (err) {
//       setLocState('error');
//       setErrorMsg(err.message || String(err));
//       setRunning(false);
//       return;
//     }

//     setSubmitState('checking');
//     try {
//       // Backend validates distance-from-office and WiFi/IP internally,
//       // and throws a message we display directly if either check fails.
//       await submitCheckIn(locationData);
//       setSubmitState('success');
//       setCheckedIn(true);
//     } catch (err) {
//       setSubmitState('error');
//       setErrorMsg(err.message || String(err));
//     }
//     setRunning(false);
//   };

//   return (
//     <div className="space-y-6 max-w-6xl">

//       {/* Header section */}
//       <div>
//         <h1 className="text-xl font-semibold">Attendance</h1>
//         <p className="text-slate-400 text-sm mt-1">Mark your daily attendance using location and network verification</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Left Column: Location & WiFi Attendance */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center text-center">
//           <h3 className="font-semibold mb-1">Attendance Check-In</h3>
//           <p className="text-slate-400 text-xs mb-6">Verify location and WiFi to mark attendance</p>

//           <div className="w-full flex flex-col gap-3 mb-6">
//             <StepRow
//               icon={MapPin}
//               label="Location Captured"
//               state={locState}
//               detail={distance !== null ? `${distance}m from office` : 'GPS check within office radius'}
//             />
//             <StepRow
//               icon={Wifi}
//               label="Server Verification"
//               state={submitState}
//               detail="Checks office radius and network on the backend"
//             />
//           </div>

//           <div className="mb-6 min-h-[20px]">
//             {checkedIn && (
//               <p className="flex items-center gap-2 text-emerald-600 text-xs font-medium">
//                 <CheckCircle2 className="w-4 h-4" />
//                 Checked in successfully!
//               </p>
//             )}
//             {errorMsg && !checkedIn && (
//               <p className="flex items-center gap-2 text-red-500 text-xs font-medium">
//                 <XCircle className="w-4 h-4" />
//                 {errorMsg}
//               </p>
//             )}
//             {!errorMsg && !checkedIn && running === false && locState === 'pending' && (
//               <p className="text-slate-400 text-xs">Tap Check In to verify your location and network</p>
//             )}
//           </div>

//           <button
//             onClick={handleCheckIn}
//             disabled={running || checkedIn}
//             className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors"
//           >
//             {checkedIn ? 'Checked In' : running ? 'Verifying...' : 'Check In'}
//           </button>
//         </div>

//         {/* Right Column: Attendance Summary */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-8">

//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-semibold">Attendance Summary</h3>
//             <span className="text-emerald-500 font-bold text-lg">94%</span>
//           </div>

//           {/* Progress Bars */}
//           <div className="space-y-4 mb-10">
//             <div className="flex items-center gap-4 text-sm">
//               <span className="w-20 text-slate-500">Present</span>
//               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
//               </div>
//               <span className="w-6 text-right font-medium text-emerald-500">66</span>
//             </div>

//             <div className="flex items-center gap-4 text-sm">
//               <span className="w-20 text-slate-500">Absent</span>
//               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
//               </div>
//               <span className="w-6 text-right font-medium text-red-500">3</span>
//             </div>

//             <div className="flex items-center gap-4 text-sm">
//               <span className="w-20 text-slate-500">Leave</span>
//               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-orange-500 rounded-full" style={{ width: '5%' }}></div>
//               </div>
//               <span className="w-6 text-right font-medium text-orange-500">1</span>
//             </div>

//             <div className="flex items-center gap-4 text-sm">
//               <span className="w-20 text-slate-500">Half Day</span>
//               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-slate-200 rounded-full" style={{ width: '0%' }}></div>
//               </div>
//               <span className="w-6 text-right font-medium text-slate-400">0</span>
//             </div>
//           </div>

//           {/* Recent Records */}
//           <h4 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">Recent Records</h4>

//           <div className="space-y-4">

//             <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
//               <div className="flex gap-4">
//                 <span className="text-slate-400">29 Jul</span>
//                 <span className="text-slate-600">In: <strong>09:02</strong></span>
//                 <span className="text-slate-600">Out: <strong>18:10</strong></span>
//               </div>
//               <span className="text-emerald-500 font-medium">9h 8m</span>
//             </div>

//             <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
//               <div className="flex gap-4">
//                 <span className="text-slate-400">28 Jul</span>
//                 <span className="text-slate-600">In: <strong>09:15</strong></span>
//                 <span className="text-slate-600">Out: <strong>18:00</strong></span>
//               </div>
//               <span className="text-emerald-500 font-medium">8h 45m</span>
//             </div>

//             <div className="flex justify-between items-center text-sm">
//               <div className="flex gap-4">
//                 <span className="text-slate-400">27 Jul</span>
//                 <span className="text-slate-600">In: <strong>09:00</strong></span>
//                 <span className="text-slate-600">Out: <strong>17:30</strong></span>
//               </div>
//               <span className="text-emerald-500 font-medium">8h 30m</span>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;

import React, { useEffect, useState } from 'react';
import { MapPin, Wifi, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { studentService } from '../../services/student.service';

function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Office location — only used for the client-side distance display.
// The backend independently verifies location/network on its own.
const OFFICE_LAT = 18.5976125;
const OFFICE_LNG = 73.805828125;

const StepRow = ({ icon: Icon, label, state, detail }) => (
  <div className="w-full flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-slate-500" />
      <div className="text-left">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {detail && <p className="text-xs text-slate-400">{detail}</p>}
      </div>
    </div>
    {state === 'pending' && <span className="w-4 h-4 rounded-full border-2 border-slate-200" />}
    {state === 'checking' && <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />}
    {state === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
    {state === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
  </div>
);

const MarkAttendance = () => {
  const [locState, setLocState] = useState('pending');
  const [submitState, setSubmitState] = useState('pending');
  const [distance, setDistance] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [running, setRunning] = useState(false);

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoadingRecords(true);
      const res = await studentService.getAttendance();
      const data = res.data || [];
      setRecords(data);

      const todayStr = new Date().toISOString().split('T')[0];
      const today = data.find((r) => r.date === todayStr);
      if (today) setCheckedIn(true);
    } catch (err) {
      console.error('Fetch attendance error:', err);
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by this browser.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const dist = getDistanceMeters(latitude, longitude, OFFICE_LAT, OFFICE_LNG);
          setDistance(Math.round(dist));
          resolve({ latitude, longitude });
        },
        () => reject('Location permission denied or unavailable.'),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });

  const handleCheckIn = async () => {
    setRunning(true);
    setErrorMsg('');
    setLocState('checking');
    setSubmitState('pending');

    let locationData;
    try {
      locationData = await getLocation();
      setLocState('success');
    } catch (err) {
      setLocState('error');
      setErrorMsg(err.message || String(err));
      setRunning(false);
      return;
    }

    setSubmitState('checking');
    try {
      await studentService.checkIn(locationData.latitude, locationData.longitude);
      setSubmitState('success');
      setCheckedIn(true);
      await fetchRecords();
    } catch (err) {
      setSubmitState('error');
      setErrorMsg(
        err.response?.data?.message || err.message || 'Check-in failed'
      );
    }
    setRunning(false);
  };

  // Summary counts from real records
  const total = records.length;
  const presentCount = records.filter((r) => r.status === 'PRESENT').length;
  const absentCount = records.filter((r) => r.status === 'ABSENT').length;
  const halfDayCount = records.filter((r) => r.status === 'HALF_DAY').length;
  const attendancePercent = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return '—';
    return new Date(dateTimeStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatShortDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '—';
    const ms = new Date(checkOut) - new Date(checkIn);
    const hrs = Math.floor(ms / (1000 * 60 * 60));
    const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hrs}h ${mins}m`;
  };

  const recentRecords = [...records]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header section */}
      <div>
        <h1 className="text-xl font-semibold">Attendance</h1>
        <p className="text-slate-400 text-sm mt-1">Mark your daily attendance using location and network verification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column: Location & WiFi Attendance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center text-center">
          <h3 className="font-semibold mb-1">Attendance Check-In</h3>
          <p className="text-slate-400 text-xs mb-6">Verify location and WiFi to mark attendance</p>

          <div className="w-full flex flex-col gap-3 mb-6">
            <StepRow
              icon={MapPin}
              label="Location Captured"
              state={locState}
              detail={distance !== null ? `${distance}m from office` : 'GPS check within office radius'}
            />
            <StepRow
              icon={Wifi}
              label="Server Verification"
              state={submitState}
              detail="Checks office radius and network on the backend"
            />
          </div>

          <div className="mb-6 min-h-[20px]">
            {checkedIn && !running && (
              <p className="flex items-center gap-2 text-emerald-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Checked in successfully!
              </p>
            )}
            {errorMsg && !checkedIn && (
              <p className="flex items-center gap-2 text-red-500 text-xs font-medium">
                <XCircle className="w-4 h-4" />
                {errorMsg}
              </p>
            )}
            {!errorMsg && !checkedIn && running === false && locState === 'pending' && (
              <p className="text-slate-400 text-xs">Tap Check In to verify your location and network</p>
            )}
          </div>

          <button
            onClick={handleCheckIn}
            disabled={running || checkedIn}
            className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {checkedIn ? 'Checked In' : running ? 'Verifying...' : 'Check In'}
          </button>
        </div>

        {/* Right Column: Attendance Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">

          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Attendance Summary</h3>
            <span className="text-emerald-500 font-bold text-lg">{attendancePercent}%</span>
          </div>

          {loadingRecords ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : (
            <>
              {/* Progress Bars */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20 text-slate-500">Present</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: total > 0 ? `${(presentCount / total) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="w-6 text-right font-medium text-emerald-500">{presentCount}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20 text-slate-500">Absent</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: total > 0 ? `${(absentCount / total) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="w-6 text-right font-medium text-red-500">{absentCount}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20 text-slate-500">Half Day</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: total > 0 ? `${(halfDayCount / total) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="w-6 text-right font-medium text-slate-400">{halfDayCount}</span>
                </div>
              </div>

              {/* Recent Records */}
              <h4 className="text-slate-400 text-xs tracking-widest uppercase mb-5 font-mono">Recent Records</h4>

              <div className="space-y-4">
                {recentRecords.length === 0 ? (
                  <p className="text-slate-400 text-sm">No records yet.</p>
                ) : (
                  recentRecords.map((r) => (
                    <div key={r.id} className="flex justify-between items-center text-sm border-b border-slate-50 pb-3 last:border-0">
                      <div className="flex gap-4">
                        <span className="text-slate-400">{formatShortDate(r.date)}</span>
                        <span className="text-slate-600">In: <strong>{formatTime(r.checkInTime)}</strong></span>
                        <span className="text-slate-600">Out: <strong>{formatTime(r.checkOutTime)}</strong></span>
                      </div>
                      <span className="text-emerald-500 font-medium">
                        {getDuration(r.checkInTime, r.checkOutTime)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default MarkAttendance;