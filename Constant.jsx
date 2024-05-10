import { FaKey } from "react-icons/fa";
import { FaKeycdn } from "react-icons/fa6";
import { CiMapPin } from "react-icons/ci";
import { MdBlurCircular } from "react-icons/md";

export const sqlDataTypes = [
  "INT",
  "VARCHAR",
  "TEXT",
  "DATE",
  "TIME",
  "DATETIME",
  "BOOLEAN",
  "FLOAT",
  "DOUBLE",
  "DECIMAL",
];
export const indexTypes = [
  { index: "Primary key", icon: <FaKey /> },
  { index: "Unique", icon: <FaKeycdn /> },
  { index: "Index", icon: <CiMapPin /> },
  { index: "None", icon: <MdBlurCircular /> },
];
