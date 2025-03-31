import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-purple-400/20 to-pink-600/20 text-white shadow-lg'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;