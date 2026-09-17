import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Mail,
  Shield,
} from "lucide-react";

const Navbar = ({
  title = "Overview",
  role = "User",
  onMenuClick,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // ================= DATE =================
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // ================= ROLE INITIAL =================
  const roleInitial = role
    .split(/\s+/)
    .filter((word) => word !== "/")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ================= ROLE COLORS =================
  const getRoleStyles = () => {
    switch (role) {
      case "Super Admin":
        return {
          avatar: "bg-orange-50 text-orange-500",
          dot: "bg-orange-400",
        };

      case "HR / Admin":
        return {
          avatar: "bg-blue-50 text-blue-500",
          dot: "bg-blue-400",
        };

      case "Student / Intern":
        return {
          avatar: "bg-violet-50 text-violet-500",
          dot: "bg-violet-400",
        };

      case "Mentor":
        return {
          avatar: "bg-orange-50 text-orange-500",
          dot: "bg-orange-400",
        };

      case "College Coordinator":
        return {
          avatar: "bg-emerald-50 text-emerald-500",
          dot: "bg-emerald-400",
        };

      default:
        return {
          avatar: "bg-emerald-50 text-emerald-500",
          dot: "bg-emerald-400",
        };
    }
  };

  const roleStyles = getRoleStyles();

  // ================= USER DETAILS =================
  const getUserDetails = () => {
    switch (role) {
      case "Super Admin":
        return {
          name: "Suresh Kumar",
          email: "suresh.kumar@ims.com",
        };

      case "HR / Admin":
        return {
          name: "HR Admin",
          email: "hr.admin@ims.com",
        };

      case "Student / Intern":
        return {
          name: "Student",
          email: "student@ims.com",
        };

      case "Mentor":
        return {
          name: "Mentor",
          email: "mentor@ims.com",
        };

      case "College Coordinator":
        return {
          name: "College Coordinator",
          email: "coordinator@ims.com",
        };

      default:
        return {
          name: "User",
          email: "user@ims.com",
        };
    }
  };

  const user = getUserDetails();

  // ================= NOTIFICATIONS =================
  const notifications = [
    {
      id: 1,
      title: "New task assigned",
      message: "You have been assigned a new task.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Attendance marked",
      message: "Your attendance has been marked for today.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Performance updated",
      message: "Your mentor has updated your performance.",
      time: "2 hours ago",
      unread: false,
    },
  ];

  // ================= CLOSE ON OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notification if clicked outside notification area
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      // Close profile if clicked outside profile area
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================= NOTIFICATION TOGGLE =================
  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);

    // Close profile when notification opens
    setProfileOpen(false);
  };

  // ================= PROFILE TOGGLE =================
  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);

    // Close notification when profile opens
    setNotificationOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        lg:left-[337px]
        right-0
        h-[78px]
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-6
        z-40
      "
    >
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <div className="flex items-center gap-4">

        {/* Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            p-2
            -ml-2
            text-slate-500
            hover:text-slate-800
            hover:bg-slate-100
            rounded-lg
            transition
          "
        >
          <Menu
            size={24}
            strokeWidth={2}
          />
        </button>

        {/* Page Title + Date */}
        <div>
          <h1
            className="
              text-[21px]
              leading-tight
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h1>

          <p
            className="
              text-[13px]
              text-slate-400
              font-mono
              mt-0.5
            "
          >
            {formattedDate}
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex items-center gap-4">

        {/* ===================================================
            NOTIFICATION
        ==================================================== */}

        <div
          className="relative"
          ref={notificationRef}
        >
          <button
            onClick={handleNotificationClick}
            className="
              relative
              p-2
              text-slate-500
              hover:text-slate-800
              hover:bg-slate-100
              rounded-lg
              transition
            "
          >
            <Bell
              size={21}
              strokeWidth={1.7}
            />

            {/* Notification Dot */}
            <span
              className={`
                absolute
                top-1.5
                right-1.5
                w-1.5
                h-1.5
                rounded-full
                ${roleStyles.dot}
              `}
            />
          </button>

          {/* =================================================
              NOTIFICATION PANEL
          ================================================== */}

          {notificationOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                w-[360px]
                bg-white
                border
                border-slate-200
                rounded-xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >

              {/* Notification Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                  border-b
                  border-slate-200
                "
              >
                <div>
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      text-slate-900
                    "
                  >
                    Notifications
                  </h3>

                  <p
                    className="
                      text-[12px]
                      text-slate-400
                      mt-0.5
                    "
                  >
                    You have new notifications
                  </p>
                </div>

                <button
                  onClick={() => setNotificationOpen(false)}
                  className="
                    p-1.5
                    rounded-lg
                    text-slate-400
                    hover:text-slate-700
                    hover:bg-slate-100
                    transition
                  "
                >
                  <X size={17} />
                </button>
              </div>

              {/* Notification List */}
              <div className="max-h-[350px] overflow-y-auto">

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="
                      flex
                      gap-3
                      px-5
                      py-4
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      cursor-pointer
                      transition
                    "
                  >

                    {/* Unread Indicator */}
                    <div className="pt-1.5">
                      <div
                        className={`
                          w-2
                          h-2
                          rounded-full
                          ${
                            notification.unread
                              ? "bg-blue-500"
                              : "bg-slate-300"
                          }
                        `}
                      />
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <h4
                          className="
                            text-[13px]
                            font-medium
                            text-slate-800
                          "
                        >
                          {notification.title}
                        </h4>

                        {notification.unread && (
                          <span
                            className="
                              text-[10px]
                              text-blue-500
                              font-medium
                              shrink-0
                            "
                          >
                            NEW
                          </span>
                        )}
                      </div>

                      <p
                        className="
                          text-[12px]
                          text-slate-500
                          mt-1
                          leading-relaxed
                        "
                      >
                        {notification.message}
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-400
                          mt-2
                        "
                      >
                        {notification.time}
                      </p>

                    </div>
                  </div>
                ))}

              </div>

              {/* Notification Footer */}
              <div
                className="
                  px-5
                  py-3
                  border-t
                  border-slate-200
                "
              >
                <button
                  className="
                    w-full
                    text-center
                    text-[12px]
                    font-medium
                    text-slate-600
                    hover:text-slate-900
                    transition
                  "
                >
                  View all notifications
                </button>
              </div>

            </div>
          )}
        </div>

        {/* ===================================================
            PROFILE
        ==================================================== */}

        <div
          className="relative"
          ref={profileRef}
        >
          <button
            onClick={handleProfileClick}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              p-1
              hover:bg-slate-50
              transition
            "
          >

            {/* Avatar */}
            <div
              className={`
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                text-[12px]
                font-medium
                ${roleStyles.avatar}
              `}
            >
              {roleInitial}
            </div>

            {/* Arrow */}
            <ChevronDown
              size={16}
              strokeWidth={1.8}
              className={`
                text-slate-400
                transition-transform
                ${profileOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* =================================================
              PROFILE INFORMATION BAR
          ================================================== */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                w-[320px]
                bg-white
                border
                border-slate-200
                rounded-xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >

              {/* Profile Header */}
              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-slate-200
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className={`
                    w-11
                    h-11
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[13px]
                    font-medium
                    ${roleStyles.avatar}
                  `}
                >
                  {roleInitial}
                </div>

                <div className="min-w-0">
                  <h3
                    className="
                      text-[14px]
                      font-semibold
                      text-slate-900
                    "
                  >
                    {user.name}
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-slate-400
                      mt-0.5
                    "
                  >
                    {role}
                  </p>
                </div>

                <button
                  onClick={() => setProfileOpen(false)}
                  className="
                    ml-auto
                    p-1.5
                    rounded-lg
                    text-slate-400
                    hover:text-slate-700
                    hover:bg-slate-100
                  "
                >
                  <X size={16} />
                </button>

              </div>

              {/* User Information */}
              <div className="px-5 py-4 space-y-4">

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="text-slate-400 mt-0.5"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      Email
                    </p>

                    <p
                      className="
                        text-[12px]
                        text-slate-700
                        mt-0.5
                        break-all
                      "
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3">
                  <Shield
                    size={16}
                    className="text-slate-400 mt-0.5"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      Role
                    </p>

                    <p
                      className="
                        text-[12px]
                        text-slate-700
                        mt-0.5
                      "
                    >
                      {role}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                  <User
                    size={16}
                    className="text-slate-400 mt-0.5"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      Account Status
                    </p>

                    <div className="flex items-center gap-2 mt-1">

                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-emerald-500
                        "
                      />

                      <p
                        className="
                          text-[12px]
                          text-emerald-600
                          font-medium
                        "
                      >
                        Active
                      </p>

                    </div>
                  </div>
                </div>

              </div>

              {/* Profile Footer */}
              <div
                className="
                  px-5
                  py-3
                  border-t
                  border-slate-200
                "
              >
              
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
