import { Link } from "react-router-dom"
const Header = () => {
    return(
        <div className="flex items-center px-4 justify-between bg-black">
            <div className="flex items-center">
                <Link to="/">
                    <img src="Netflix_Logo_RGB.png" alt="NETFLIX" className="w-40 h-16 px-7 py-2"/>
                </Link>
                <p className="px-3 text-sm text-white font-semibold">Home</p>
                <p className="px-3 text-sm text-white">Shows</p>
                <p className="px-3 text-sm text-white">Movies</p>
                <p className="px-3 text-sm text-white">Games</p>
                <p className="px-3 text-sm text-white">New & Popular</p>
                <p className="px-3 text-sm text-white">My List</p>
                <p className="px-3 text-sm text-white">Browse by languages</p>
            </div>
            <div className="flex items-center w-65 justify-between pr-10">
                <img src="search_icon.png" alt="Search..." />
                <p className="text-sm text-white">Children</p>
                <img src="bell.png" alt="Notifications" className="w-6 h-6"/>
                <div className="group">
                    <div className="flex relative">
                        <img src="user.jpeg" alt="User" className="w-8 h-8 rounded-sm mr-2"/>
                        <button>
                            <img src="triangle.png" alt="user" className="w-2 h-2 group-hover:rotate-180 duration-300"/>
                        </button>
                    </div>
                        <div className="group-hover:block relative hidden">
                            <div className="absolute top-0  bg-red w-10 h-48 pt-2">
                                <img src="triangle.png" alt="users" className="rotate-180 w-3 h-3 absolute right-1/2" />
                                <ul className="top-0 w-40 px-2 py-5 absolute top-4 -right-4 bg-black">
                                    <li className="pb-1 flex items-center"><img src="user1.jpeg" alt="User" className="w-8 h-8 rounded-sm mr-2"/><a className="block text-white text-xs hover:underline cursor-pointer">User 1</a></li>
                                    <li className="py-2 flex items-center"><img src="user2.jpeg" alt="User" className="w-8 h-8 rounded-sm mr-2"/><a className="block text-white text-xs hover:underline cursor-pointer">User 2</a></li>
                                    <li className="py-2 flex items-center"><img src="user3.jpeg" alt="User" className="w-8 h-8 rounded-sm mr-2"/><a className="block text-white text-xs hover:underline cursor-pointer">User 3</a></li>
                                    <li className="py-2 flex items-center"><img src="pen.png" alt="Manage Profiles" className="w-8 h-8 rounded-full mr-2 bg-white"/><a className="block text-white text-xs hover:underline cursor-pointer">Manage Profiles</a></li>
                                    <li className="pt-2 flex items-center"><img src="profile.png" alt="Account" className="w-8 h-8 rounded-full mr-2 bg-white"/><a className="block text-white text-xs hover:underline cursor-pointer">Account</a></li>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Header