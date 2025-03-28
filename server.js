  // Loads the express module
  const express = require("express");
  const hbs = require("hbs");

  const bodyParser = require("body-parser");

  const path = require("path");

  //Creates our express server
  const app = express();
  const port = 3000;

  //Serves static files (we need it to import a css file)
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "hbs");
  app.use(bodyParser.urlencoded({ extended: true }));

  //Sets a basic route

  // Render the initial page with the number input form
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Create express route binder for draw.hbs and get the data from the url as parameters
  // that came from index.hbs

  app.get("/happy", (req, res) => {
    res.render("happy")
  })

  app.post("/happy", (req, res) => {
    const formData = req.body;

    const guests = [];
    const filtered = [];
    const num = parseInt(formData.number);

    //Song Arrays
    pronoun = formData.gender == "male" ? "he's" : "she's";
    const goodFellow = ["For", `${pronoun}`, "a", "jolly", "good", "fellow.", "For", `${pronoun}`, "a", "jolly", "good", "fellow.", "For", `${pronoun}`, "a", "jolly", "good", "fellow,", "which", "nobody", "can", "deny!"];
    const happyBirthday = ["Happy", "birthday", "to", "you.", "Happy", "birthday", "to", "you.", "Happy", "birthday", "dear", `${formData.name}`, "Happy", "birthday", "to", "you!"];

    // Loop through the form data and push the name and checkbox values to the guests array
    for (let i = 1; i<=num; i++) {
      let name = formData[`name${i}`];
      let checkBox = formData[`checkbox${i}`] ? "on" : "off";
      guests.push({
        name: name,
        nameNumber: `name${i}`,
        checkBox: checkBox,
        checkBoxNumber: `checkbox${i}`
      })
    }


    // Filter the guests array to only include the names of the guests that have the checkbox checked
    for (let i = 0; i < guests.length; i++) {
      if (guests[i].checkBox == "on") {
        filtered.push(guests[i].name);
      }
    }

    // Create the song output
    let output = "";
    let stop = false;
    index = 0;
    while (!stop) {
      output += `${filtered[index%filtered.length]}: ${happyBirthday[index%16]}<br>`;

      if (index >= filtered.length - 1 && index % 16 == 15) {
        stop = true;
      }
      index++
    }

    output += `${filtered[index%filtered.length]}: For, ${pronoun}, a, jolly, good, fellow., For, ${pronoun}, a, jolly, good, fellow., For, ${pronoun}, a, jolly, good, fellow, which, nobody, can,  deny!`

    res.render("happy", {form: formData, guests: guests, output: output} );
  });

  //Makes the app listen to port 3000
  app.listen(port, () => console.log(`App listening to port ${port}`));
