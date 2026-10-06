import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const statusOptions = [
  {
    value: "UPCOMING",
    label: "Upcoming",
    dot: "bg-yellow-500",
  },
  {
    value: "IN PROGRESS",
    label: "In Progress",
    dot: "bg-blue-500",
  },
  {
    value: "ON HOLD",
    label: "On Hold",
    dot: "bg-orange-500",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    dot: "bg-green-500",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    dot: "bg-red-500",
  },
  {
    value: "OVERDUE",
    label: "Overdue",
    dot: "bg-red-500",
  },
  {
    value: "MAINTENANCE",
    label: "Maintenance",
    dot: "bg-teal-500",
  },
  {
    value: "UNDER REVIEW",
    label: "Under Review",
    dot: "bg-purple-500",
  },
  {
    value: "PENDING",
    label: "Pending",
    dot: "bg-amber-500",
  },
  {
    value: "NOT STARTED",
    label: "Not Started",
    dot: "bg-slate-500",
  },
  {
    value: "TESTING",
    label: "Testing",
    dot: "bg-indigo-500",
  },
  {
    value: "DEPLOYMENT",
    label: "Deployment",
    dot: "bg-cyan-500",
  },
  {
    value: "REWORK REQUIRED",
    label: "Rework Required",
    dot: "bg-orange-500",
  },
  {
    value: "ARCHIVED",
    label: "Archived",
    dot: "bg-slate-400",
  },
];

function getStatusStyle(status) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-50 text-green-600";

    case "UPCOMING":
      return "bg-yellow-50 text-yellow-600";

    case "IN PROGRESS":
      return "bg-blue-50 text-blue-600";

    case "ON HOLD":
      return "bg-orange-50 text-orange-600";

    case "CANCELLED":
    case "OVERDUE":
      return "bg-red-50 text-red-600";

    case "MAINTENANCE":
      return "bg-teal-50 text-teal-600";

    case "UNDER REVIEW":
      return "bg-purple-50 text-purple-600";

    case "PENDING":
      return "bg-amber-50 text-amber-600";

    case "NOT STARTED":
    case "ARCHIVED":
      return "bg-slate-100 text-slate-600";

    case "TESTING":
      return "bg-indigo-50 text-indigo-600";

    case "DEPLOYMENT":
      return "bg-cyan-50 text-cyan-600";

    case "REWORK REQUIRED":
      return "bg-orange-50 text-orange-600";

    default:
      return "bg-blue-50 text-blue-600";
  }
}

function UpdateProjectStatus({ status, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const currentStatus =
    statusOptions.find((option) => option.value === status) ||
    statusOptions.find((option) => option.value === "IN PROGRESS");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleStatusSelect = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* CURRENT STATUS */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 transition hover:shadow-sm ${getStatusStyle(
          status
        )}`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />

        {currentStatus.label}

        <ChevronDown
          size={15}
          strokeWidth={2}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* STATUS DROPDOWN */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Update Status
            </p>
          </div>

          <div className="max-h-72 overflow-y-auto py-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusSelect(option.value)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50 transition"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${option.dot}`}
                  />

                  <span className="text-sm text-slate-700">
                    {option.label}
                  </span>
                </span>

                {status === option.value && (
                  <Check
                    size={16}
                    className="text-blue-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProjectStatus;