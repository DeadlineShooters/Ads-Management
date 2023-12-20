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

document.addEventListener("DOMContentLoaded", function () {
  // Check if the form is dirty (has been modified)
  let formDirty = false;

  // Function to set the form as dirty
  function setFormDirty() {
    formDirty = true;
  }

  // Attach event listeners to form elements to mark the form as dirty
  const formElements = document.querySelectorAll("form input, form select, form textarea");
  formElements.forEach(function (element) {
    element.addEventListener("input", setFormDirty);
  });

  // Attach beforeunload event listener to show confirmation when leaving the page
  window.addEventListener("beforeunload", function (event) {
    if (formDirty) {
      event.preventDefault();
      return ""; // Standard for most browsers
    }
  });
});
