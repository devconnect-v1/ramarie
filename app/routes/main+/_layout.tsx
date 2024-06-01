import { NavLink, Outlet } from "@remix-run/react";
import { Search, LogOut, Bolt, Star, Home, CookingPot, User, Bell } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="flex h-max flex-col bg-gradient-to-b from-emerald-600 to-emerald-400">
      <main className="relative h-full">
        <div className="fixed inset-0 h-full">
            <ol className="px-5 mt-8">
                {/* Search */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <Search></Search>
                  </NavLink>
                </li>

                {/* Home */}
                <li key="A" className="text-white mt-5">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <Home></Home>
                  </NavLink>
                </li>

                {/* Notifications  */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <Bell></Bell>
                  </NavLink>
                </li>

                {/* Cooking */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <CookingPot></CookingPot>
                  </NavLink>
                </li>

                {/* Notes */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <Star></Star>
                  </NavLink>
                </li>

                {/* Preferences */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <Bolt></Bolt>
                  </NavLink>
                </li>

                {/* Profile */}
                <li key="A" className="text-white">
                  <NavLink
                    className={({ isActive }) =>
                      `block p-4 text-xl ${isActive ? "" : ""}`
                    }
                    to="#"
                  >
                    <User></User>
                  </NavLink>
                </li>
            </ol>

            {/* Logout */}
            <ol className="px-5 absolute bottom-0 mb-10 text-white">
              <li key="A" className="">
                <NavLink
                  className={({ isActive }) =>
                    `block p-4 text-xl ${isActive ? "" : ""}`
                  }
                  to="#"
                >
                  <LogOut></LogOut>
                </NavLink>
              </li>
            </ol>
        </div>

        <div className="py-10 h-screen overflow-y-auto w-11/12 float-end px-6 bg-white rounded-l-[40px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
