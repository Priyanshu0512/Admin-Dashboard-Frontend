import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import AddEventModal from "../components/modals/AddEventModal";

const Calendar = () => {
  const { darkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // month, week, day
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      color: "bg-blue-500",
      location: "Conference Room A",
      attendees: 8,
    },
    {
      id: 2,
      title: "Project Review",
      start: new Date(2024, 0, 18, 14, 0),
      end: new Date(2024, 0, 18, 15, 30),
      color: "bg-green-500",
      location: "Office 201",
      attendees: 5,
    },
    {
      id: 3,
      title: "Client Presentation",
      start: new Date(2024, 0, 22, 9, 0),
      end: new Date(2024, 0, 22, 10, 30),
      color: "bg-purple-500",
      location: "Virtual",
      attendees: 12,
    },
    {
      id: 4,
      title: "Design Workshop",
      start: new Date(2024, 0, 25, 13, 0),
      end: new Date(2024, 0, 25, 17, 0),
      color: "bg-orange-500",
      location: "Design Studio",
      attendees: 6,
    },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Calendar
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your schedule and upcoming events.
          </p>
        </div>

        <button
          onClick={() => setIsAddEventModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      {/* Calendar Controls */}
      <div
        className={`p-4 rounded-lg border flex items-center justify-between ${
          darkMode ? "bg-dark-900 border-dark-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth(-1)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-dark-800 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {monthYear}
          </h2>

          <button
            onClick={() => navigateMonth(1)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-dark-800 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`flex space-x-1 rounded-lg p-1 ${
            darkMode ? "bg-dark-800" : "bg-gray-100"
          }`}
        >
          {["month", "week", "day"].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                view === viewType
                  ? "bg-white dark:bg-dark-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {viewType}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div
          className={`lg:col-span-3 rounded-lg border overflow-hidden ${
            darkMode
              ? "bg-dark-900 border-dark-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`grid grid-cols-7 ${
              darkMode ? "bg-dark-800" : "bg-gray-50"
            }`}
          >
            {weekDays.map((day) => (
              <div
                key={day}
                className={`p-3 text-center text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday =
                day && day.toDateString() === new Date().toDateString();
              const isCurrentMonth =
                day && day.getMonth() === currentDate.getMonth();

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-b border-r last:border-r-0 ${
                    darkMode ? "border-dark-700" : "border-gray-200"
                  } ${!isCurrentMonth && day ? "opacity-40" : ""}`}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday
                            ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            : darkMode
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {day.getDate()}
                      </div>

                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                            title={event.title}
                          >
                            {formatTime(event.start)} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`rounded-lg border p-6 ${
            darkMode
              ? "bg-dark-900 border-dark-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Upcoming Events
          </h3>

          <div className="space-y-4">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border ${
                  darkMode
                    ? "border-dark-700 hover:bg-dark-800"
                    : "border-gray-200 hover:bg-gray-50"
                } transition-colors cursor-pointer`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`} />
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {event.title}
                    </h4>

                    <div
                      className={`mt-1 space-y-1 text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </div>

                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>

                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default Calendar;
