const signup = require('../../config')

const acceptProject = async () => {
    console.log(window.location)
    const id = window.location.pathname.split("/")[2]
    const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to create project");
      }
}


document
.getElementById("accepted")
.addEventListener("click", acceptProject, signup);