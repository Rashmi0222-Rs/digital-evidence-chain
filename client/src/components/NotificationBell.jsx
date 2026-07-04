import { useEffect, useState } from "react";
import { Bell, Trash2, CheckCircle, AlertTriangle, Info } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch {
      console.log("Failed to load notifications");
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;
  const latest = notifications.slice(0, 5);

  const iconFor = (type) => {
    if (type === "success") return <CheckCircle className="text-green-300" size={18} />;
    if (type === "warning") return <AlertTriangle className="text-yellow-300" size={18} />;
    if (type === "error") return <AlertTriangle className="text-red-300" size={18} />;
    return <Info className="text-cyan-300" size={18} />;
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day ago`;
  };

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

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-2xl bg-purple-500/20 border border-purple-400/30 p-3 text-purple-300 hover:bg-purple-500/30 transition"
      >
        <Bell />

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 rounded-3xl border border-white/10 bg-slate-950 shadow-2xl z-[9999] p-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
            <h3 className="font-bold text-lg">
              Notifications {unread > 0 && `(${unread})`}
            </h3>

            <div className="flex gap-3">
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-red-300 text-sm">
                  Clear
                </button>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/notifications");
                }}
                className="text-cyan-300 text-sm"
              >
                View All
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {latest.map((n) => (
              <div
                key={n._id}
                className={`rounded-2xl border border-white/10 p-3 ${
                  n.read ? "bg-white/5" : "bg-cyan-500/10"
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-1">{iconFor(n.type)}</div>

                  <div className="flex-1">
                    <p className="font-bold">{n.title}</p>
                    <p className="text-sm text-slate-400">{n.message}</p>
                    <p className="text-xs text-cyan-300 mt-1">
                      {timeAgo(n.createdAt)}
                    </p>

                    <div className="flex gap-3 mt-2">
                      {!n.read && (
                        <button
                          onClick={() => markRead(n._id)}
                          className="text-green-300 text-xs flex gap-1"
                        >
                          <CheckCircle size={14} /> Read
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(n._id)}
                        className="text-red-300 text-xs flex gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {latest.length === 0 && (
              <p className="text-center text-slate-400 py-8">
                No notifications.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;