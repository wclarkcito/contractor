const { Projects } = require("../models");

const projects = [
    {
        title: "Plumbing",
        body: "The crapper backed up onto the floor and down the stairs I'm drowning in feces",
        quote: 22000,
        homeowner_id: 1,
    },
    {
        title: "Electrical",
        body: "lightning struck the clock tower and everything exploded",
        quote: 24000,
        homeowner_id: 2,
    },
    {
        title: "Carpentry",
        body: "grandma buried her life savings under the floorboards",
        quote: 17000,
        homeowner_id: 3,
    },
    {
        title: "Pest Control",
        body: "a bee hive dropped down the chimney and murder hornets are everywhere",
        quote: 5000,
        homeowner_id: 4,
    },
    {
        title: "Roofing",
        body: "A nearby trebuchet catapulted a cow and it destroyed our roof",
        quote: 2000,
        homeowner_id: 5,
    },
    {
        title: "Landscaping",
        body: "the sceptic tank has overflowed and the entire backyard is now a sewer",
        quote: 15000,
        homeowner_id: 6,
    },
];

const projectData = () => Projects.bulkCreate(projects, {
    individualHooks: true,
    returning: true,
});

module.exports = projectData;