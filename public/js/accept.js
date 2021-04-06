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
        // Node Mailer fetch request
        const accepted = await response.json()
        const nodeMailer = await fetch("/api/users/signup", {
          method: "POST", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            userEmail: accepted.email,
            name: accepted.name
          })
        });
        if (!nodeMailer.ok){
          alert("failed to send email") 
        }

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

// const nodeMailer = async () => {
  
// }

document.getElementById("accepted").addEventListener("click", acceptProject);