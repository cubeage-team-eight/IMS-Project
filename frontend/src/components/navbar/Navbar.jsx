import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import NotificationPanel from "./NotificationPanel";
import ProfilePanel from "./ProfilePanel";

const Navbar = ({
  title = "Overview",
  role = "User",
  onMenuClick,
}) => {
  const { user: loggedInUser } = useAuth();

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

  // ================= ACTUAL LOGGED-IN USER =================

  const user = loggedInUser;

  // Backend role name can be different from UI role name

  const roleMap = {
    SUPER_ADMIN: "Super Admin",
    HR_ADMIN: "HR / Admin",
    COLLEGE_COORDINATOR: "College Coordinator",
    MENTOR: "Mentor",
    STUDENT: "Student / Intern",
  };

  const actualRole =
    roleMap[user?.role?.name] ||
    user?.role?.name ||
    role;

  // ================= ROLE INITIAL =================

  const roleInitial = actualRole
    .split(/\s+/)
    .filter((word) => word !== "/")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ================= ROLE COLORS =================

  const getRoleStyles = () => {
    switch (actualRole) {
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
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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

          {/* Notification Panel */}

          {notificationOpen && (
            <NotificationPanel
              notifications={notifications}
              onClose={() =>
                setNotificationOpen(false)
              }
            />
          )}
        </div>

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

          {/* Profile Panel */}

          {profileOpen && (
            <ProfilePanel
              user={user}
              actualRole={actualRole}
              roleInitial={roleInitial}
              roleStyles={roleStyles}
              onClose={() =>
                setProfileOpen(false)
              }
            />
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;