import { useEffect } from "react";
import {
  Mail,
  X,
} from "lucide-react";

const DrawerSection = ({ title, children }) => (
  <section className="mb-7 last:mb-0">
    <p className="mb-3.5 font-['JetBrains_Mono',monospace] text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5A623]">
      {title}
    </p>
    {children}
  </section>
);

const ContactRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3.5">
    <Icon size={16} className="shrink-0 text-slate-400" />

    <span className="w-[92px] shrink-0 font-['JetBrains_Mono',monospace] text-[13px] text-slate-400">
      {label}
    </span>

    <span className="min-w-0 break-words text-[15px] font-medium text-slate-800">
      {value}
    </span>
  </div>
);

const SupView = ({ account, onClose, onEdit, onToggle }) => {
  const isActive = account.isActive;

  const initials = account.name
    ? account.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "?";

  useEscape(onClose);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px]"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col bg-white shadow-2xl">
        <div className="bg-[#0A1626] px-7 pb-6 pt-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[0.14em] text-slate-400">
              HR / Admin Profile
            </p>

            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#1B2C40] text-[19px] font-bold text-[#F5A623] ring-2 ring-[#F5A623]/50">
              {initials}
            </div>

            <div className="min-w-0 pt-1">
              <h3 className="font-['Source_Serif_4',Georgia,serif] text-[24px] font-bold leading-tight text-white">
                {account.name}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 font-['JetBrains_Mono',monospace] text-[12px] font-medium ${
                    isActive
                      ? "bg-emerald-400/15 text-emerald-400"
                      : "bg-red-400/15 text-red-400"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          <DrawerSection title="Contact">
            <div className="space-y-2">
              <ContactRow icon={Mail} label="Email" value={account.email} />
            </div>
          </DrawerSection>
        </div>

        <div className="space-y-3 border-t border-slate-200 px-7 py-5">
          <button
            onClick={onEdit}
            className="w-full rounded-lg bg-[#F5A623] py-3.5 text-[15px] font-bold text-white transition hover:bg-[#DE9114]"
          >
            Edit Account
          </button>

          <button
            onClick={onToggle}
            className={`w-full rounded-lg py-3.5 text-[15px] font-bold transition ${
              isActive
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            {isActive ? "Disable Account" : "Enable Account"}
          </button>
        </div>
      </aside>
    </>
  );
};

const useEscape = (onClose) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
};

export default SupView;