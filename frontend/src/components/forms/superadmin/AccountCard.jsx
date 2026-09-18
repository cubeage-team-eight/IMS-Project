import {
  Mail,
  Eye,
  SquarePen,
  Ban,
  CircleCheck,
  Trash2,
} from "lucide-react";

const AccountCard = ({ account, onView, onEdit, onToggle, onDelete }) => {
  const isActive = account.status === "Active";

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.07)]">
      <div className="p-5">
        {/* --- identity --- */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FEF6E7] text-[13px] font-bold text-[#B87410]">
            {account.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-[17px] font-bold">{account.name}</h3>

              <span
                className={`rounded-md px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[11px] font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {account.status}
              </span>
            </div>

            <p className="mt-1 text-[14px] text-slate-500">
              {account.title} · {account.department}
            </p>

            <p className="mt-0.5 font-['JetBrains_Mono',monospace] text-[13px] text-slate-400">
              {account.id}
            </p>
          </div>
        </div>

        {/* --- stats --- */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 rounded-lg border border-slate-200">
          <Stat value={account.colleges} label="Colleges" />

          <Stat
            value={account.permissions}
            label="Permissions"
            color="text-[#F5A623]"
          />

          <Stat
            value={account.actions}
            label="Actions"
            color="text-emerald-500"
          />
        </div>

        {/* --- meta --- */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[13.5px] text-slate-500">
            <Mail size={15} className="text-slate-400" />
            {account.email}
          </span>

          <span className="text-[13.5px] text-slate-400">
            Login: {account.lastLogin}
          </span>
        </div>
      </div>

      {/* --- actions --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-t border-slate-200">
        <Action
          icon={Eye}
          label="View"
          className="text-slate-600"
          onClick={onView}
        />

        <Action
          icon={SquarePen}
          label="Edit"
          className="text-blue-500"
          onClick={onEdit}
        />

        {isActive ? (
          <Action
            icon={Ban}
            label="Disable"
            className="text-[#F5A623]"
            onClick={onToggle}
          />
        ) : (
          <Action
            icon={CircleCheck}
            label="Enable"
            className="text-emerald-500"
            onClick={onToggle}
          />
        )}

        <Action
          icon={Trash2}
          label="Delete"
          className="text-red-500"
          onClick={onDelete}
        />
      </div>
    </article>
  );
};

const Stat = ({ value, label, color = "text-slate-900" }) => (
  <div className="py-3.5 text-center">
    <p
      className={`font-['Source_Serif_4',Georgia,serif] text-[19px] font-bold ${color}`}
    >
      {value}
    </p>
    <p className="mt-0.5 text-[12.5px] text-slate-400">{label}</p>
  </div>
);

const Action = ({ icon: Icon, label, className, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-3.5 text-[14px] outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 ${className}`}
  >
    <Icon size={16} strokeWidth={1.9} />
    {label}
  </button>
);

export default AccountCard;