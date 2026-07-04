import { useEffect, useState } from "react";
import { Bell, Trash2, CheckCircle } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch {
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markRead = async (id) => {
    await API.put(`/notifications/${id}`);
    toast.success("Marked as read");
    loadNotifications();
  };

  const deleteNotification = async (id) => {
    await API.delete(`/notifications/${id}`);
    toast.success("Notification deleted");
    loadNotifications();
  };

  const clearAll = async () => {
    await API.delete("/notifications");
    toast.success("All notifications cleared");
    loadNotifications();
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Bell /> Notifications
          {unread > 0 && (
            <span className="text-sm bg-red-500 px-3 py-1 rounded-full">
              {unread}
            </span>
          )}
        </h3>

        {notifications.length > 0 && (
          <button onClick={clearAll} className="text-red-300">
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`rounded-2xl border border-white/10 p-4 ${
              n.read ? "bg-slate-950/50" : "bg-cyan-500/10"
            }`}
          >
            <h4 className="font-bold">{n.title}</h4>
            <p className="text-sm text-slate-300">{n.message}</p>
            <p className="text-xs text-cyan-300 mt-2">
              {new Date(n.createdAt).toLocaleString()}
            </p>

            <div className="flex gap-3 mt-3">
              {!n.read && (
                <button
                  onClick={() => markRead(n._id)}
                  className="text-green-300 flex gap-1 text-sm"
                >
                  <CheckCircle size={16} /> Mark Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n._id)}
                className="text-red-300 flex gap-1 text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-slate-400 py-8">
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationCenter;