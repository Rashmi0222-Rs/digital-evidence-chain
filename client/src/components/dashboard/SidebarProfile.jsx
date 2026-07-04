function SidebarProfile({ collapsed }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  let avatarUrl = "";

  if (user?.avatar) {
    const avatarPath = user.avatar.replace(/\\/g, "/");

    avatarUrl = avatarPath.startsWith("http")
      ? avatarPath
      : `http://localhost:5000/${avatarPath}`;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 mb-4">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            onError={(e) => {
              e.target.style.display = "none";
            }}
            className="h-12 w-12 rounded-full object-cover border border-cyan-400/40"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
        )}

        {!collapsed && (
          <div>
            <p className="font-bold">{user?.name || "User"}</p>
            <p className="text-xs text-cyan-300 capitalize">
              {user?.role || "User"}
            </p>
            <p className="text-xs text-green-300">● Online</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarProfile;