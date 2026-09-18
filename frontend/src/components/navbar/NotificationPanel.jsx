import { X } from "lucide-react";

const NotificationPanel = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-0 top-12 w-[360px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
      {/* Notification Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">
            Notifications
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            You have new notifications
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X size={17} />
        </button>
      </div>

      
      <div className="max-h-[350px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex gap-3 px-5 py-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
          >
            
            <div className="pt-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  notification.unread ? "bg-blue-500" : "bg-slate-300"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[13px] font-medium text-slate-800">
                  {notification.title}
                </h4>

                {notification.unread && (
                  <span className="text-[10px] text-blue-500 font-medium shrink-0">
                    NEW
                  </span>
                )}
              </div>

              <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                {notification.message}
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Footer */}
      <div className="px-5 py-3 border-t border-slate-200">
        <button className="w-full text-center text-[12px] font-medium text-slate-600 hover:text-slate-900 transition">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;