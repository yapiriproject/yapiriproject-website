/*
  Kokborok Phrasebook data
  ------------------------
  Add a phrase by appending an object to the `phrases` list below. Only add phrases
  that have been checked by a native speaker. The page shows exactly what is here.

  Fields
    category  one of the category ids below (required)
    english   the English meaning, which is also what visitors search by (required)
    roman     Roman Kokborok, in the Yapiri spelling conventions (required)
    yapiri    the same phrase in Yapiri script (optional)
    audio     path to a recording, for example "assets/audio/phrases/greetings-001.mp3" (optional)
    note      a short usage note, such as politeness level or when to say it (optional)

  Example (shape only):
    { category: "greetings", english: "...", roman: "...", yapiri: "...", audio: "", note: "" }

  Category names and descriptions can be edited freely. Add a new category by adding
  one more object to `categories`.
*/
window.PHRASEBOOK = {
  categories: [
    { id: "greetings",   name: "Greetings and polite phrases",   blurb: "Hello, goodbye, thank you, sorry" },
    { id: "introducing", name: "Introducing yourself",           blurb: "Names, where you are from, what you do" },
    { id: "family",      name: "Family and relationships",       blurb: "Parents, siblings, relatives, friends" },
    { id: "food",        name: "Food and drink",                 blurb: "Meals, ordering, tastes, water and tea" },
    { id: "travel",      name: "Travel and directions",          blurb: "Asking the way, near and far, places" },
    { id: "transport",   name: "Transport",                      blurb: "Buses, roads, tickets, rides" },
    { id: "shopping",    name: "Shopping and money",             blurb: "Prices, buying, bargaining at the market" },
    { id: "time",        name: "Time, days and numbers",         blurb: "Today, tomorrow, hours, counting" },
    { id: "weather",     name: "Weather and nature",             blurb: "Rain, heat, hills, rivers, trees" },
    { id: "health",      name: "Health and emergencies",         blurb: "Feeling unwell, asking for help" },
    { id: "home",        name: "Home and village life",          blurb: "House, neighbours, daily routines" },
    { id: "farming",     name: "Farming and work",               blurb: "Fields, harvest, tools, jobs" },
    { id: "festivals",   name: "Festivals and culture",          blurb: "Celebrations, songs, customs" },
    { id: "feelings",    name: "Feelings and everyday talk",     blurb: "Happy, tired, agreeing, small talk" }
  ],
  phrases: []
};
