const { Projects } = require("../models");

const projects = [
  {
    //make sure to add a contract id
    title: "Plumbing",
    body:
      "The crapper backed up onto the floor and down the stairs I'm drowning in feces and shame.",
    quote: 22000,
    homeowner_id: 1,
    contractor_id: 5,
  },
  {
    title: "Electrical",
    body:
      "Lightning struck the clock tower Marty and Doc Brown vanished and absconded with my Hamster. I need 1.1 jigawatts of electricity to power my flux capacitor.",
    quote: 20000,
    homeowner_id: 2,
    contractor_id: 3,
  },
  {
    title: "Carpentry",
    body:
      "Grandma buried her life savings in the ground then built a house on top of it",
    quote: 17000,
    homeowner_id: 3,
    contractor_id: 2,
  },
  {
    title: "Pest Control",
    body:
      "A bee hive dropped down the chimney and murder hornets are everywhere.",
    quote: 5000,
    homeowner_id: 4,
    contractor_id: 1,
  },
  {
    title: "Roofing",
    body:
      "A nearby trebuchet catapulted a cow through our roof. My hair is ruined.",
    quote: 10000,
    homeowner_id: 5,
    contractor_id: 6,
  },
  {
    title: "Landscaping",
    body:
      "The sceptic tank has overflowed and the entire backyard is now a sewer.",
    quote: 15000,
    homeowner_id: 6,
    contractor_id: 5,
  },
];

const projectsData = () =>
  Projects.bulkCreate(projects, {
    individualHooks: true,
    returning: true,
  });

module.exports = projectsData;
