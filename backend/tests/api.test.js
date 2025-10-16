// backend/tests/api.test.js

import request from "supertest";
import express from "express";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User API Endpoints", () => {
  let testUser = {
    fullName: "Test User",
    email: "testuser@example.com",
    password: "password123",
    role: "admin",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(testUser.email);
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fetch all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
