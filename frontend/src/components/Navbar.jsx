export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-black to-blue-950 shadow-md">
      <h1 className="text-white text-xl font-bold">Dashboard</h1>

      <button className="text-white font-medium hover:text-blue-400 transition-colors">
        Admin
      </button>
    </nav>
  );
};
