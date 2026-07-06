import { useEffect, useState } from "react";
import {
  Bell,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}`);
      loadNotifications();
    } catch {
      toast.error("Unable to mark notification");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      toast.success("Notification deleted");
      loadNotifications();
    } catch {
      toast.error("Unable to delete notification");
    }
  };

  const clearAll = async () => {
    try {
      await API.delete("/notifications");
      toast.success("Notifications cleared");
      loadNotifications();
    } catch {
      toast.error("Unable to clear notifications");
    }
  };

  const iconFor = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-400" size={22} />;
      case "warning":
        return <AlertTriangle className="text-yellow-400" size={22} />;
      case "error":
        return <AlertTriangle className="text-red-400" size={22} />;
      default:
        return <Info className="text-cyan-400" size={22} />;
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div className="flex items-center gap-3">
          <Bell size={28} />

          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          {unread > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {unread}
            </span>
          )}
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-2 text-red-300 hover:bg-red-500/30 transition"
          >
            Clear All
          </button>
        )}

      </div>

      <div className="space-y-4">

        {notifications.length > 0 ? (

          notifications.map((n) => (

            <div
              key={n._id}
              className={`rounded-2xl border border-white/10 p-5 transition hover:border-cyan-400/30 ${
                n.read
                  ? "bg-slate-950/40"
                  : "bg-cyan-500/10"
              }`}
            >
              <div className="flex gap-4">

                <div className="mt-1">
                  {iconFor(n.type)}
                </div>

                <div className="flex-1">

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">

                    <div>
                      <h3 className="font-bold text-lg">
                        {n.title}
                      </h3>

                      <p className="text-slate-300 mt-1">
                        {n.message}
                      </p>

                      <p className="text-xs text-cyan-300 mt-2">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">

                    {!n.read && (
                      <button
                        onClick={() => markRead(n._id)}
                        className="text-green-300 flex items-center gap-1 text-sm hover:text-green-200"
                      >
                        <CheckCircle size={16} />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(n._id)}
                      className="text-red-300 flex items-center gap-1 text-sm hover:text-red-200"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            </div>

          ))

        ) : (

          <div className="text-center py-20">

            <Bell
              size={60}
              className="mx-auto text-slate-500 mb-4"
            />

            <h3 className="text-xl font-bold">
              No Notifications
            </h3>

            <p className="text-slate-400 mt-2">
              You're all caught up.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default NotificationCenter;