import { X, User, Mail, Shield } from "lucide-react";

const ProfilePanel = ({ user, actualRole, roleInitial, roleStyles, onClose }) => {
  return (
    <div className="absolute right-0 top-12 w-[320px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
      {/* Profile Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-medium ${roleStyles.avatar}`}>
          {roleInitial}
        </div>

        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-slate-900">
            {user?.name || "User"}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{actualRole}</p>
        </div>

        <button
          onClick={onClose}
          className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X size={16} />
        </button>
      </div>

      {/* User Information */}
      <div className="px-5 py-4 space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail size={16} className="text-slate-400 mt-0.5" strokeWidth={1.8} />
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Email</p>
            <p className="text-[12px] text-slate-700 mt-0.5 break-all">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>

        {/* Role */}
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-slate-400 mt-0.5" strokeWidth={1.8} />
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Role</p>
            <p className="text-[12px] text-slate-700 mt-0.5">{actualRole}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-start gap-3">
          <User size={16} className="text-slate-400 mt-0.5" strokeWidth={1.8} />
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Account Status
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[12px] text-emerald-600 font-medium">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Footer */}
      <div className="px-5 py-3 border-t border-slate-200"></div>
    </div>
  );
};

export default ProfilePanel;