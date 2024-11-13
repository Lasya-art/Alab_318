const express = require("express");
const app = express();
const port = 3000;

// serve static files from the styles directory
app.use(express.static("./styles"));

// require the filesystem module
const fs = require("fs");
// define the template engine
app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "perscholas"); // register the template engine

app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };

  res.render("index", options);
});

app.get("/about/:courseName", (req, res) => {
    const { courseName } = req.params;
    const options = {
      title: "About the courses",
      content:
        "Click on the link to find the locations<a href='http://localhost:3000/locations'>Location</a>,Per Scholas offers no-cost training in the most in-demand tech skills, including Cloud, Cybersecurity, Data Engineering, IT Support, Software Engineering,",
    };
    app.post("/about/:courseName", (req, res) => {
        console.log("Form data received for course:", req.params.courseName);
        console.log("Form data:", req.body); // Log form data
        res.send(`Form submitted successfully for ${req.params.courseName} course!`);
      });
      
  
    res.render("About", options);
  });

  app.get("/locations", (req, res) => {
    const options = {
      title: "Where to find us ",
      content: `
      <p>Per Scholas offers no-cost training in the most in-demand tech skills, including Cloud, Cybersecurity, Data Engineering, IT Support, Software Engineering.</p>
      <form action="/locations" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <button type="submit">Submit</button>
      </form>
    `,
  };
  app.post("/locations", (req, res) => {
    console.log("Form data received:", req.body); // Log form data
    res.send("Form submitted successfully!");
  });
  
    res.render("locations", options);
  });
  
  

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
