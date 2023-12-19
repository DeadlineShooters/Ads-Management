function resizeInput(input) {
  input.style.width = input.value.length + "ch";
}

let user = "<%= user.role %>";

if (user !== "so") {
  const submitTrigger = document.getElementById("editButton");

  submitTrigger.onclick = function (event) {
    let editReasonEmpty = document.getElementById("moTa").value === "";

    if (editReasonEmpty) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("moTa").classList.add("is-invalid");
    } else {
      document.getElementById("moTa").classList.remove("is-invalid");
    }
  };
}
