const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/contprofile");
      } else {
        alert("Failed to delete project");
      }
    }
  };
  
  document.querySelector(".contDelete").addEventListener("click", delButtonHandler);