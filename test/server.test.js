
const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/server");

test("home page displays TaskTrack", async () => {
  const response = await request(app).get("/");
  assert.equal(response.status, 200);
  assert.match(response.text, /TaskTrack/);
});

test("tasks API returns three tasks", async () => {
  const response = await request(app).get("/api/tasks");
  assert.equal(response.status, 200);
  assert.equal(response.body.length, 3);
});

test("health endpoint reports healthy", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "healthy");
});
