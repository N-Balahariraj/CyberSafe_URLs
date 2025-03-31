import { Users, Bot, Home } from 'lucide-react';
import NavLink from '../Components/NavLink';
import ProfileDropdown from '../Components/ProfileDropdown';

const Navbar = () => (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-6 overflow-x-auto">
                    <NavLink to="/">
                        <Home size={20} /> Home
                    </NavLink>
                    <NavLink to="/community">
                        <Users size={20} /> Community
                    </NavLink>
                    <NavLink to="/ai-assistant">
                        <Bot size={20} /> AI Assistant
                    </NavLink>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    </nav>
)

export default Navbar;