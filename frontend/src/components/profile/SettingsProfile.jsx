import React from "react";
import { Settings, X, ChevronDown } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
const SettingsProfile = () => {
  return (
    <div className=" h-40 w-full bg-gray-300 rounded-lg hover:shadow-black shadow-lg">
      <div className=" flex gap-3 items-center justify-between p-2 shadow">
        <Settings size={36} /> <span className=" text-xl"> Settings</span>
        <X size={26} />
      </div>
      <br />
      <div className=" p-3">
        <div className=" flex justify-between">
          <h1>Theme</h1>
          <div>
            <Menu>
              <MenuButton>
                <ChevronDown />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className=" flex-col gap-2 flex bg-gray-600 rounded-lg text-white text-lg"
              >
                <MenuItem>
                  <button className=" hover:bg-white p-3 hover:text-black">
                    Light
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className=" p-3 hover:bg-black"> Dark</button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className=" flex justify-between">
          <button> Language</button>
          <Menu>
            <MenuButton>
              <ChevronDown />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className=" flex-col gap-2 flex bg-gray-600 rounded-lg shadow-lg text-white text-lg"
            >
              <MenuItem>
                <button className=" hover:bg-white p-2 hover:text-black">
                  English
                </button>
              </MenuItem>
              <MenuItem>
                <button className=" hover:bg-white p-2 hover:text-black">
                  Italian
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
