import { toast as toastify } from "react-toastify";

export const toast = ({ color, message }) => {
  toastify[color](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
