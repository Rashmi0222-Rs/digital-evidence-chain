import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, LogOut, Lock, Camera } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";
import { IMAGE_URL } from "../config/config";

function Profile({ user, logout }) {
  const getStoredUser = () => JSON.parse(localStorage.getItem("user") || "{}");

  const [localUser, setLocalUser] = useState(getStoredUser());
  const [name, setName] = useState(localUser?.name || "");
  const [email, setEmail] = useState(localUser?.email || "");
  const [avatar, setAvatar] = useState(localUser?.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const buildAvatarUrl = (path) => {
    if (!path) return "";
    const cleanPath = path.replace(/\\/g, "/");

    return cleanPath.startsWith("http")
      ? cleanPath
      : `${IMAGE_URL}/${cleanPath}`;
  };

  const avatarUrl = preview || buildAvatarUrl(avatar);

  useEffect(() => {
    const storedUser = getStoredUser();

    setLocalUser(storedUser);
    setName(storedUser?.name || user?.name || "");
    setEmail(storedUser?.email || user?.email || "");
    setAvatar(storedUser?.avatar || user?.avatar || "");
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();

    if (!avatarFile) {
      toast.error("Select profile picture");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const res = await API.post("/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        ...localUser,
        ...res.data.user,
        avatar: res.data.user?.avatar || res.data.avatar || "",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));

      setLocalUser(updatedUser);
      setAvatar(updatedUser.avatar);
      setAvatarFile(null);
      setPreview("");

      toast.success("Profile picture updated");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Avatar upload failed");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/profile/update", { name, email });

      const updatedUser = {
        ...localUser,
        ...res.data.user,
        avatar: localUser.avatar || res.data.user?.avatar || "",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));

      toast.success("Profile updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Enter current and new password");
      return;
    }

    try {
      await API.put("/profile/password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <User /> Profile & Settings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
          <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-5 flex flex-col items-center justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border border-cyan-400/40 mb-3"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-3xl font-bold mb-3">
                {(localUser?.name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <p className="text-slate-400 text-sm">Profile Picture</p>
          </div>

          <InfoCard icon={<User className="text-cyan-300 mb-3" />} title="Name" value={localUser?.name} />

          <InfoCard icon={<Mail className="text-purple-300 mb-3" />} title="Email" value={localUser?.email} breakText />

          <InfoCard icon={<ShieldCheck className="text-green-300 mb-3" />} title="Role" value={localUser?.role} capitalize />

          <button
            onClick={logout}
            className="rounded-2xl bg-red-500/20 border border-red-400/30 p-5 text-left hover:bg-red-500/30 transition"
          >
            <LogOut className="text-red-300 mb-3" />
            <p className="text-slate-300 text-sm">Session</p>
            <h4 className="font-bold text-red-300">Logout</h4>
          </button>
        </div>
      </div>

      <form
        onSubmit={uploadAvatar}
        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <Camera /> Upload Profile Picture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-cyan-300"
          />

          <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 font-bold">
            Upload Avatar
          </button>
        </div>
      </form>

      <form
        onSubmit={updateProfile}
        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <User /> Update Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New name"
          />

          <input
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New email"
          />

          <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 font-bold">
            Save Profile
          </button>
        </div>
      </form>

      <form
        onSubmit={changePassword}
        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <Lock /> Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
          />

          <input
            type="password"
            className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />

          <button className="w-full rounded-xl bg-gradient-to-r from-green-500 to-cyan-400 py-3 font-bold">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

function InfoCard({ icon, title, value, breakText, capitalize }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-5">
      {icon}
      <p className="text-slate-400 text-sm">{title}</p>
      <h4
        className={`font-bold ${breakText ? "break-all" : ""} ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "N/A"}
      </h4>
    </div>
  );
}

export default Profile;