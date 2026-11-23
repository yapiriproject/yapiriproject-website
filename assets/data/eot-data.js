/*
  Encyclopedia of Tripura (EOT) data
  ----------------------------------
  Add an entry by appending an object to the `entries` list below. Only add entries
  that have been checked against their sources. The page shows exactly what is here.

  Fields
    category  one of the category ids below (required)
    title     the entry title, such as the name of a tribe, a river or a species (required)
    summary   one or two plain sentences describing the topic (required)
    url       the page for the full entry, for example "eot/rivers-gumti.html" (optional)
    kokborok  the Kokborok name, only if it has been verified (optional)

  Example (shape only):
    { category: "rivers", title: "...", summary: "...", url: "", kokborok: "" }

  Category names and descriptions can be edited freely. Add a new category by adding
  one more object to `categories`.
*/
window.EOT = {
  categories: [
    { id: "geography",  name: "Geography of Tripura",        blurb: "Hills, plains, districts, climate" },
    { id: "rivers",     name: "Rivers of Tripura",           blurb: "Rivers, lakes and water systems" },
    { id: "places",     name: "Places and heritage sites",   blurb: "Towns, temples, palaces, landmarks" },
    { id: "history",    name: "History of Tripura",          blurb: "From early times to the present" },
    { id: "tribes",     name: "Tribes of Tripura",           blurb: "The communities of the state" },
    { id: "people",     name: "People of Tripura",           blurb: "Writers, artists, leaders, thinkers" },
    { id: "flora",      name: "Flora of Tripura",            blurb: "Trees, plants, bamboo, medicinal herbs" },
    { id: "fauna",      name: "Fauna of Tripura",            blurb: "Animals, birds, fish, insects" },
    { id: "festivals",  name: "Festivals and traditions",    blurb: "Celebrations, rituals, customs" },
    { id: "arts",       name: "Arts, music and crafts",      blurb: "Songs, dance, weaving, bamboo and cane" },
    { id: "food",       name: "Food and agriculture",        blurb: "Traditional food, farming, jhum, markets" },
    { id: "language",   name: "Language and literature",     blurb: "Kokborok and the languages of Tripura" }
  ],
  entries: []
};
