import { AddBoxRounded } from "@mui/icons-material";

export default function AddButton({ className = '', disabled, children, ...props }) {
  return (
    <button
          {...props}
          className={
              `inline-flex items-center px-4 py-2 bg-green-400 border border-transparent rounded-md font-semibold text-xl text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                  disabled && 'opacity-25'
              } ` + className
          }
          disabled={disabled}
        >
          <AddBoxRounded className="mr-2" />
          {children}
        </button>
  );
}