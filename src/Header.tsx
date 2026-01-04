import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div
        className={`
          absolute inset-0 bg-black transition-opacity duration-500 ease-in-out
          ${scroll > 0 ? "opacity-100" : "opacity-0"}
        `}
      />

      <div className="relative flex items-center justify-between px-[3%] bg-linear-to-b from-black to-transparent">
        <div className="flex items-center flex-none">
          <Link to="/">
            <img
              src="Netflix_Logo_RGB.png"
              alt="NETFLIX"
              className="w-35 pr-7 py-2"
            />
          </Link>

          <p className="px-3 text-sm text-white font-semibold">Home</p>
          <p className="px-3 text-sm text-white">Shows</p>
          <p className="px-3 text-sm text-white">Movies</p>
          <p className="px-3 text-sm text-white">Games</p>
          <p className="px-3 text-sm text-white">New & Popular</p>
          <Link to="/myList">
            <p className="px-3 text-sm text-white">My List</p>
          </Link>
          <p className="px-3 text-sm text-white">Browse by languages</p>
        </div>

        <div className="flex items-center gap-4 pr-10 flex-none">
          <img src="search_icon.png" alt="Search" />

          <p className="text-sm text-white">Children</p>

          <img src="bell.png" alt="Notifications" className="w-6 h-6" />

          <div className="group relative">
            <div className="flex items-center cursor-pointer">
              <img
                src="user.jpeg"
                alt="User"
                className="w-8 h-8 rounded-sm mr-2"
              />
              <img
                src="triangle.png"
                alt="toggle"
                className="w-2 h-2 transition-transform duration-300 group-hover:rotate-180"
              />
            </div>

            <div className="hidden group-hover:block absolute right-0 top-10">
              <div className="relative">
                <img
                  src="triangle.png"
                  alt="arrow"
                  className="rotate-180 w-3 h-3 absolute right-4 -top-2"
                />

                <ul className="w-40 px-2 py-5 bg-black">
                  <li className="pb-2 flex items-center">
                    <img src="user1.jpeg" className="w-8 h-8 mr-2 rounded-sm" />
                    <span className="text-white text-xs hover:underline cursor-pointer">
                      User 1
                    </span>
                  </li>

                  <li className="py-2 flex items-center">
                    <img src="user2.jpeg" className="w-8 h-8 mr-2 rounded-sm" />
                    <span className="text-white text-xs hover:underline cursor-pointer">
                      User 2
                    </span>
                  </li>

                  <li className="py-2 flex items-center">
                    <img src="user3.jpeg" className="w-8 h-8 mr-2 rounded-sm" />
                    <span className="text-white text-xs hover:underline cursor-pointer">
                      User 3
                    </span>
                  </li>

                  <li className="py-2 flex items-center">
                    <img src="pen.png" className="w-8 h-8 mr-2 bg-white rounded-full" />
                    <span className="text-white text-xs hover:underline cursor-pointer">
                      Manage Profiles
                    </span>
                  </li>

                  <li className="pt-2 flex items-center">
                    <img
                      src="profile.png"
                      className="w-8 h-8 mr-2 bg-white rounded-full"
                    />
                    <span className="text-white text-xs hover:underline cursor-pointer">
                      Account
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
