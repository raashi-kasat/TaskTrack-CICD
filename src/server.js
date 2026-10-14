
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const tasks = [
  { id: 1, title: "Set up CI/CD pipeline", completed: false },
  { id: 2, title: "Build Docker image", completed: false },
  { id: 3, title: "Deploy with Kubernetes", completed: false }
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>TaskTrack</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 700px;
          margin: 50px auto; padding: 20px; background: #f4f6f8; }
        h1 { color: #263c70; }
        .card { background: white; padding: 20px; margin: 12px 0;
          border-radius: 10px; box-shadow: 0 2px 8px #ddd; }
        .status { color: #087443; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>TaskTrack</h1>
      <title>TaskTrack | CI/CD Deployment v2.0</title>
<h2>🚀 CI/CD Update Successful — Version 2.0</h2>
<p>Updated directly on GitHub and deployed using Jenkins and Kubernetes.</p>
      <p>Simple Task Management Application</p>
      <p class="status">Application status: Running</p>
      <p>Version: 1.0.0</p>
      ${tasks.map(task => `
        <div class="card">
          <strong>${task.id}. ${task.title}</strong>
          <p>${task.completed ? "Completed" : "Pending"}</p>
        </div>
      `).join("")}
    </body>
    </html>
  `);
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", version: "1.0.0" });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TaskTrack running on port ${PORT}`);
  });
}

module.exports = app;
