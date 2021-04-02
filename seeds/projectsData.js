const { User } = require("../models");

const users = [
    {
        title: "Plumbing",
        body: "The crapper backed up onto the floor and down the stairs I'm drowning in feces",
        quote: "$22,000",
        homeowner_id: 1,
    },
    {
        title: "Electrical",
        body: "lightning struck the clock tower and everything exploded",
        quote: "$24,000",
        homeowner_id: 2,
    },
    {
        title: "Carpentry",
        body: "grandma buried her life savings under the floorboards",
        quote: "$17,000",
        homeowner_id: 3,
    },
    {
        title: "Pest Control",
        body: "a bee hive dropped down the chimney and murder hornets are everywhere",
        quote: "$5,000",
        homeowner_id: 4,
    },
    {
        title: "Roofing",
        body: "A nearby trebuchet catapulted a cow and it destroyed our roof",
        quote: "$20,000",
        homeowner_id: 5,
    },
    {
        title: "Landscaping",
        body: "the sceptic tank has overflowed and the entire backyard is now a sewer",
        quote: "$15,000",
        homeowner_id: 6,
    },


];

const userData = () => User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
});

module.exports = userData;