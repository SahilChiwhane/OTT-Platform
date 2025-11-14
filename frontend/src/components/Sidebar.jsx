import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWishlistCount from '../hooks/useWishlistCount';
import {
  FaSearch,
  FaFilm,
  FaTv,
  FaListAlt,
  FaCog,
  FaQuestionCircle,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = () => {
  // collapsed by default as requested
  const [collapsed, setCollapsed] = useState(true);
  const [hovering, setHovering] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const count = useWishlistCount(); // live-updating wishlist count

  const items = [
    { key: 'movies', label: 'Movies', to: '/movies', icon: <FaFilm /> },
    { key: 'tvshows', label: 'TV Shows', to: '/tvshows', icon: <FaTv /> },
    { key: 'anime', label: 'Anime', to: '/anime', icon: <FaFilm /> },
    { key: 'search', label: 'Search', to: null, icon: <FaSearch />, action: () => navigate('/search') },
    { key: 'wishlist', label: 'Wishlist', to: '/wishlist', icon: <FaListAlt /> },
    { key: 'settings', label: 'Settings', to: '/settings', icon: <FaCog /> },
    { key: 'help', label: 'Help', to: '/help', icon: <FaQuestionCircle /> },
  ];

  const isRouteActive = (to) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const renderItem = (item) => {
    const active = isRouteActive(item.to);
    const base = `flex items-center gap-3 p-3 rounded-md transition-all duration-200 ease-in-out relative group`;
    const activeClasses = active ? `bg-[#1c1c1c] text-white` : `text-gray-300 hover:bg-[#1c1c1c]`;

    // full badge shown when expanded
    const expandedBadge = (
      <span
        className="ml-auto inline-flex items-center justify-center min-w-[22px] h-6 text-xs font-semibold rounded-full bg-red-600 text-white"
        aria-hidden
      >
        {count > 99 ? '99+' : count}
      </span>
    );

    // collapsed small badge/dot
    const collapsedBadge = (
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-red-600 text-white">
          {count > 9 ? '•' : count === 0 ? '' : count}
        </span>
      </span>
    );

    const content = (
      <>
        <span className="text-lg">{item.icon}</span>

        {/* label only when expanded */}
        {!collapsed && <span className="sidebar--Font">{item.label}</span>}

        {/* Wishlist badges */}
        {item.key === 'wishlist' && !collapsed && (
          <span className="ml-auto">{expandedBadge}</span>
        )}

        {item.key === 'wishlist' && collapsed && count > 0 && (
          collapsedBadge
        )}

        {/* Tooltip shown when collapsed */}
        {collapsed && (
          <span className="absolute left-full ml-3 whitespace-nowrap bg-[#1c1c1c] text-white text-sm px-2 py-1 rounded opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none z-50">
            {item.label}
          </span>
        )}
      </>
    );

    if (item.action) {
      return (
        <div
          key={item.key}
          onClick={item.action}
          className={`${base} ${activeClasses} cursor-pointer ${collapsed ? 'justify-center' : ''}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') item.action(); }}
          aria-label={item.label}
        >
          {content}
        </div>
      );
    }

    return (
      <Link
        key={item.key}
        to={item.to}
        className={`${base} ${activeClasses} ${collapsed ? 'justify-center' : ''}`}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </Link>
    );
  };

  return (
    <aside
      className={`bg-[#121212] h-full flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-60'}`}
      onMouseEnter={() => { if (collapsed) setHovering(true); }}
      onMouseLeave={() => { if (collapsed) setHovering(false); }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative flex items-center justify-center">
            {/* Logo (hidden when collapsed but hovering) */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-200 transform
                ${collapsed && hovering ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
              `}
              aria-hidden={collapsed && hovering}
            >
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full text-white select-none">
                <span className="font-bold">S</span>
                <span className="font-light text-sm">24</span>
              </div>
            </div>

            {/* Expand button (visible when collapsed+hovering) */}
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className={`absolute inset-0 m-auto w-10 h-10 flex items-center justify-center rounded-full focus:outline-none transition-all duration-200 transform
                ${collapsed && hovering ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
              `}
            >
              <FaChevronRight size={18} className="text-gray-300" />
            </button>
          </div>

          {/* site name only when expanded */}
          {!collapsed && (
            <span className="text-white font-bold text-lg select-none">Stream24</span>
          )}
        </div>

        {/* collapse button when expanded */}
        {!collapsed && (
          <div className="w-12 h-12 flex items-center justify-center">
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              className="w-10 h-10 flex items-center justify-center rounded-full focus:outline-none transition-transform duration-200 hover:scale-105"
            >
              <FaChevronLeft size={18} className="text-gray-300" />
            </button>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 flex flex-col gap-1 mt-2 px-1">
        {items.map(renderItem)}
      </nav>

      {/* ACCOUNT */}
      <div className="mt-auto mb-4 px-1">
        <div
          onClick={() => navigate('/profile')}
          className={`flex items-center gap-3 p-3 text-gray-300 hover:bg-[#1c1c1c] rounded-md cursor-pointer transition-all duration-200 ease-in-out ${collapsed ? 'justify-center group' : ''}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/profile'); }}
        >
          <FaUserCircle className="text-lg" />
          {!collapsed && <span className="sidebar--Font">Account</span>}

          {collapsed && (
            <span className="absolute left-full ml-3 whitespace-nowrap bg-[#1c1c1c] text-white text-sm px-2 py-1 rounded opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none z-50">
              Account
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
