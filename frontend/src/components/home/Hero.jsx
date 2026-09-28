// export default function Hero() {
//   return (
//     <div className="relative bg-[#0B1D2A] text-white min-h-screen overflow-hidden">

//       {/* Background Grid */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-40"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
//           `,
//           backgroundSize: "70px 70px",
//         }}
//       ></div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

//           {/* Hero Section */}
//           <div className="min-h-[450px] pt-12">

//             <p className="text-orange-400 border border-orange-400 inline-block px-4 py-1 rounded-full text-sm mb-6">
//               PROJECT DOCUMENTATION - V1.0
//             </p>

//             <h1 className="text-6xl font-bold font-serif leading-[1.05] tracking-tight">
//               Internship <br />
//               <span className="text-orange-500 italic">
//                 Management
//               </span>{" "}
//               <br />
//               System
//             </h1>

//             <p className="text-gray-400 mt-6 max-w-lg font-sans leading-relaxed">
//               A comprehensive, role-based web platform that digitizes and
//               automates the complete internship lifecycle — from student
//               registration to certificate generation.
//             </p>

//             {/* Buttons */}
//             <div className="flex gap-4 mt-8">

//               <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
//                 Access Dashboards
//               </button>

//               <button className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-800 transition">
//                 Explore Modules
//               </button>

//             </div>
//           </div>

//           {/* Statistics Cards */}
//           <div className="grid grid-cols-2 gap-6">

//             {/* Card 1 */}
//             <div className="bg-[#132A3A]/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
//               <h2 className="text-3xl text-orange-400 font-bold">
//                 16
//               </h2>
//               <p className="text-gray-400 mt-2">
//                 SYSTEM MODULES
//               </p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-[#132A3A]/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
//               <h2 className="text-3xl text-orange-400 font-bold">
//                 5
//               </h2>
//               <p className="text-gray-400 mt-2">
//                 USER ROLES
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-[#132A3A]/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
//               <h2 className="text-3xl text-orange-400 font-bold">
//                 10K+
//               </h2>
//               <p className="text-gray-400 mt-2">
//                 STUDENTS SUPPORTED
//               </p>
//             </div>

//             {/* Card 4 */}
//             <div className="bg-[#132A3A]/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
//               <h2 className="text-3xl text-orange-400 font-bold">
//                 100%
//               </h2>
//               <p className="text-gray-400 mt-2">
//                 PAPERLESS WORKFLOW
//               </p>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

export default function Hero() {
  return (
    <section className="relative bg-[#0B1D2A] text-white overflow-hidden">

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Main Content */}
<div className="relative z-10 w-full px-7 pt-16 pb-20">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

    {/* LEFT */}
    <div className="pt-8">

      {/* Badge */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-3 rounded-full border border-orange-500 px-3 py-1.5 text-xs tracking-[0.12em] text-orange-400">
          <span className="h-2 w-2 rounded-full bg-orange-500"></span>
          PROJECT DOCUMENTATION - V1.0
        </span>
      </div>

            {/* Heading */}
            <h1 className="font-serif text-[72px] leading-[0.98] tracking-tight font-semibold">
              <span className="block text-white">
                Internship
              </span>

              <span className="block italic text-orange-500">
                Management
              </span>

              <span className="block text-white">
                System
              </span>
            </h1>

            {/* Description */}
            <p className="mt-10 max-w-[650px] text-[18px] leading-[1.65] text-[#91A8BC]">
              A comprehensive, role-based web platform that digitizes and
              automates the complete internship lifecycle — from student
              registration to certificate generation.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-5">
              <button className="rounded-lg bg-orange-500 px-8 py-4 font-semibold hover:bg-orange-600 transition">
                Access Dashboards
              </button>

              <button className="rounded-lg border border-[#526779] px-8 py-4 hover:bg-white/5 transition">
                Explore Modules
              </button>
            </div>

          </div>


          {/* RIGHT CARDS */}
          <div className="grid grid-cols-2 gap-5 pt-[285px]">

            <div className="min-h-[148px] rounded-xl border border-white/10 bg-[#132A3A]/80 p-7">
              <h2 className="font-serif text-[48px] leading-none text-orange-500">
                16
              </h2>
              <p className="mt-5 text-sm tracking-[0.08em] text-[#91A8BC]">
                SYSTEM MODULES
              </p>
            </div>

            <div className="min-h-[148px] rounded-xl border border-white/10 bg-[#132A3A]/80 p-7">
              <h2 className="font-serif text-[48px] leading-none text-orange-500">
                5
              </h2>
              <p className="mt-5 text-sm tracking-[0.08em] text-[#91A8BC]">
                USER ROLES
              </p>
            </div>

            <div className="min-h-[148px] rounded-xl border border-white/10 bg-[#132A3A]/80 p-7">
              <h2 className="font-serif text-[48px] leading-none text-orange-500">
                10K+
              </h2>
              <p className="mt-5 text-sm tracking-[0.08em] text-[#91A8BC]">
                STUDENTS SUPPORTED
              </p>
            </div>

            <div className="min-h-[148px] rounded-xl border border-white/10 bg-[#132A3A]/80 p-7">
              <h2 className="font-serif text-[48px] leading-none text-orange-500">
                100%
              </h2>
              <p className="mt-5 text-sm tracking-[0.08em] text-[#91A8BC]">
                PAPERLESS WORKFLOW
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="text-[11px] tracking-[0.35em] text-white/20">
          SCROLL
        </span>
      </div>

    </section>
  );
}