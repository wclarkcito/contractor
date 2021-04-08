const acceptProject = async () => {
  console.log(window.location)
  const id = window.location.pathname.split("/")[2]
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  if (response.ok) {
    // Node Mailer fetch request
    const accepted = await response.json()

    const { contractor, homeowner } = accepted
    console.log(contractor)
    console.log(homeowner)
    const nodeMailerContractor = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: contractor.email,
        name: contractor.name
      })
    });
    // console.log(nodeMailerContractor)
    if (!nodeMailerContractor.ok) {
      alert("failed to send email to contractor")
    }
    // console.log("trying to send email to homeowner")
    const nodeMailerHomeowner = await fetch("/api/users/get-the-bill", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: homeowner.email,
        name: homeowner.name
      })
    });
    // console.log(nodeMailerHomeowner)
    if (!nodeMailerHomeowner.ok) {
      alert("failed to send email to homeowner")
    }

    document.location.replace("/contProfile");
  } else {
    alert("Failed to create project");
  }
}
document.getElementById("accepted").addEventListener("click", acceptProject);




