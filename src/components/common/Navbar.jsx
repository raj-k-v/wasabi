function Navbar() {
  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Search companies"
        className="search-input"
      />

      <div className="profile">
        <span>AI Intelligence Agent</span>
      </div>
    </div>
  );
}

export default Navbar;