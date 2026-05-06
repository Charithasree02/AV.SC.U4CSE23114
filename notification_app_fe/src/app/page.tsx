"use client";

import { useEffect, useState } from "react";

import { fetchNotifications } from "@/services/notificationService";

import { sortNotifications } from "@/utils/sortNotifications";
import { Log } from "../../../logging_middleware/logger";

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [viewedNotifications, setViewedNotifications] = useState<string[]>([]);

  useEffect(() => {
    Log(
      "frontend",
      "info",
      "page",
      "Campus Notifications page loaded"
    );

    const storedViewed = localStorage.getItem("viewedNotifications");
    if (storedViewed) {
      setViewedNotifications(JSON.parse(storedViewed));
    }

    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();

        const sortedNotifications = sortNotifications(
          data.notifications
        );

        setNotifications(sortedNotifications);
        Log(
          "frontend",
          "info",
          "api",
          "Notifications fetched successfully"
        );
      } catch (error) {
        console.error(error);
        Log(
          "frontend",
          "error",
          "api",
          "Failed to fetch notifications"
        );
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.Type === filter
        );

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Placement":
        return "bg-green-100 text-green-700";

      case "Result":
        return "bg-blue-100 text-blue-700";

      case "Event":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleNotificationClick = (id: string) => {
    if (!viewedNotifications.includes(id)) {
      const updatedViewed = [...viewedNotifications, id];
      setViewedNotifications(updatedViewed);
      Log(
        "frontend",
        "info",
        "component",
        `Notification viewed: ${id}`
      );
      localStorage.setItem("viewedNotifications", JSON.stringify(updatedViewed));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Campus Notifications
        </h1>

        {/* Filter Buttons */}

        <div className="flex gap-3 flex-wrap mb-6">
          {["All", "Placement", "Result", "Event"].map(
            (type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  Log(
                    "frontend",
                    "info",
                    "component",
                    `Filter changed to ${type}`
                  );
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === type
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        {/* Notifications */}

        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div
                key={item.ID}
                onClick={() => handleNotificationClick(item.ID)}
                className={`rounded-xl p-5 border transition cursor-pointer ${
                  viewedNotifications.includes(item.ID)
                    ? "bg-gray-100"
                    : "bg-white hover:shadow-md shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                      item.Type
                    )}`}
                  >
                    {item.Type}
                  </span>

                  <span className="text-sm text-gray-500">
                    {item.Timestamp}
                  </span>
                </div>

                <p className="text-lg text-gray-800 font-medium">
                  {item.Message}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl text-center text-gray-500">
              No notifications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
