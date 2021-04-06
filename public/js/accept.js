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
        document.location.replace("/contProfile");
      } else {
        alert("Failed to create project");
      }
}
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};



document.getElementById("accepted").addEventListener("click", acceptProject);