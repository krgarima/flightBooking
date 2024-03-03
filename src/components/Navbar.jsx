// import Search from "./Search";
// import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Navbar = () => {
  return (
    <div className="w-full h-16 fixed top-0 z-10 flex justify-between items-center px-6 border-2 ">
      <h2 className="text-2xl font-bold">JetSetGo</h2>

      <MenuRoundedIcon />
    </div>
  );
};

export default Navbar;
