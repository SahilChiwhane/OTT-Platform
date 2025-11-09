import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link for navigation
import { assets } from '../assets/assets';

const Sidebar = () => {
    const location = useLocation(); // Get the current route location

    return (
        <div className='w-[35%] sidebar'>
            <div className='sidebar--BG'>
                <div className='sidebar--Menu sidebar--Brand hover:bg-[#121212]'>
                    <img className='w-9' src={assets.logo} alt='logo' />
                    <p className='font-bold text-[18px] text-base text-[#0C76D8] tracking-widest'>Stream24</p>
                </div>
                <Link to='/' className={`sidebar--Menu ${location.pathname === '/' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.home_icon} alt='home' />
                    <p className='sidebar--Font'>Home</p>
                </Link>
                {/* <Link to='/discover' className={`sidebar--Menu ${location.pathname === '/discover' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.explore_icon} alt='discover' />
                    <p className='sidebar--Font'>Discover</p>
                </Link> */}
                <div className={`sidebar--Menu`}>
                    <img className='sidebar--icon' src={assets.search_icon} alt='search' />
                    <p className='sidebar--Font'>Search</p>
                </div>
                <Link to='/movies' className={`sidebar--Menu ${location.pathname === '/movies' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.movies_icon} alt='movies' />
                    <p className={`sidebar--Font `}>Movies</p>
                </Link>
                <Link to='/tvshows' className={`sidebar--Menu ${location.pathname === '/tvshows' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.tv_icon} alt='tv shows' />
                    <p className='sidebar--Font'>TV Shows</p>
                </Link>
                <Link to='/anime' className={`sidebar--Menu ${location.pathname === '/anime' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.anime_icon} alt='anime' />
                    <p className='sidebar--Font'>Anime</p>
                </Link>
                {/* <Link to='/trending' className={`sidebar--Menu ${location.pathname === '/trending' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.trending_icon} alt='trending' />
                    <p className='sidebar--Font'>Trending</p>
                </Link> */}
                <Link to='/settings' className={`sidebar--Menu ${location.pathname === '/settings' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.settings_icon} alt='settings' />
                    <p className='sidebar--Font'>Settings</p>
                </Link>
                <Link to='/help' className={`sidebar--Menu ${location.pathname === '/help' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.help_icon} alt='help' />
                    <p className='sidebar--Font'>Help</p>
                </Link>
                <Link to='/profile' className={`sidebar--Menu m-3 ml-0 mb-0 pl-0 ${location.pathname === '/profile' ? 'border-[#4b4b4b] border-r-4 bg-[#1c1c1c]' : 'bg-[#121212]'}`}>
                    <img className='sidebar--icon' src={assets.profile_icon} alt='profile' />
                    <p className='sidebar--Font'>Profile</p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
