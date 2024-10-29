import * as React from "react";
import { ThemeContextType } from "../@types/context";
import { ThemeContext } from "../utilities/globalContext";

export default function Settings() {
  const [open, setOpen] = React.useState(false);
  const { darkmode, changeDarkmode } = React.useContext(ThemeContext) as ThemeContextType;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDarkmode = () => {
    changeDarkmode();
  };

  return (
    <section className="flex justify-end">
      <button
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
        onClick={handleClick}
      >
        Settings
      </button>
      <dialog open={open}>
        <div className="flex justify-center flex-col w-fit bg-gray-300 p-8 rounded-md">
          <div className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white">
            <input type="checkbox" name="toggle" id="toggle" checked={darkmode} onClick={toggleDarkmode} />
            <label htmlFor="toggle">Dark mode</label>
          </div>
          <div>
            <button
              className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
