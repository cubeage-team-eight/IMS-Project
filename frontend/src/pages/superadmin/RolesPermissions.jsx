

import {
  
} from "lucide-react";

/* ================================================================= */
/*                          PAGE DATA                                */
/* ================================================================= */



const ROLES = [
  { name: "Super Admin", badge: "System", users: 1, permissions: 42 },
  { name: "HR / Admin", badge: "Active", users: 4, permissions: 28 },
  { name: "College Coordinator", badge: "Active", users: 12, permissions: 14 },
  { name: "Mentor", badge: "Active", users: 34, permissions: 18 },
  { name: "Student", badge: "Active", users: 847, permissions: 10 },
];

/* ================================================================= */
/*                             PAGE                                  */
/* ================================================================= */

const RolePermissions = () => {

return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <main className="p-4 sm:p-6 lg:p-7">
        <div className="mb-6">
          <h2 className="text-[26px] font-bold leading-tight">
            Role & Permission Management
          </h2>

          <p className="mt-1 text-[15px] text-slate-400">
            Define roles and fine-tune system access permissions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ROLES.map((role) => (
            <RoleCard key={role.name} role={role} />
          ))}
        </div>
      </main>
    </div>
  );
};


/* ================================================================= */
/*                           ROLE CARD                               */
/* ================================================================= */

const RoleCard = ({ role }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-6">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-[17px] font-bold">{role.name}</h3>

      <span className="rounded-md bg-[#FEF6E7] px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[11px] font-medium text-[#B87410]">
        {role.badge}
      </span>
    </div>

    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Metric value={role.users} label="Users" />
      <Metric
        value={role.permissions}
        label="Permissions"
        color="text-[#F5A623]"
      />
    </div>

    <button className="mt-4 w-full rounded-lg bg-slate-100 py-3.5 text-[15px] font-medium text-slate-700 transition hover:bg-slate-200">
      Manage Permissions
    </button>
  </article>
);

const Metric = ({ value, label, color = "text-slate-900" }) => (
  <div className="rounded-lg bg-slate-50 py-5 text-center">
    <p
      className={`text-[26px] font-bold leading-none ${color}`}
    >
      {value}
    </p>
    <p className="mt-2 text-[13.5px] text-slate-400">{label}</p>
  </div>
);
/* ================================================================= */
/*                            SIDEBAR                                */
/* ================================================================= */



/* ================================================================= */
/*                             TOPBAR                                */
/* ================================================================= */



export default RolePermissions;
