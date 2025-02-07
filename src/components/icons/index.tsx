import { BsCashCoin, BsCashStack, BsFillHouseFill } from "react-icons/bs";
import { RiHome5Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { LuMapPinPlus } from "react-icons/lu";
import { PiPlantThin } from "react-icons/pi";
import { FaUserGear } from "react-icons/fa6";

export const iconMapping: { [key: string]: JSX.Element } = {
  "BsFillHouseFill": <BsFillHouseFill />,
  "RiHome5Line": <RiHome5Line />,
  "GoPeople": <GoPeople />,
  "AiOutlineUsergroupAdd": <AiOutlineUsergroupAdd />,
  "FiMapPin": <FiMapPin />,
  "LuMapPinPlus": <LuMapPinPlus />,
  "PiPlantThin": <PiPlantThin />,
  "BsCashStack": <BsCashStack />,
  "BsCashCoin": <BsCashCoin />,
  "FaUserGear": <FaUserGear />,
 
  // tambahkan pemetaan untuk ikon lainnya di sini
};