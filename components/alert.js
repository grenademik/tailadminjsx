import Swal from "sweetalert2"

const ThrowAlert = Swal.mixin({
  toast: true,
  position: "bottom-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast"
  },
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true
})

export default ThrowAlert
