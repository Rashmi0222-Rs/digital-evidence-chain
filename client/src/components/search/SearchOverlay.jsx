function SearchOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
    />
  );
}

export default SearchOverlay;