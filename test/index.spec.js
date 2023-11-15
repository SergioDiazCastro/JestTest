import  request  from "supertest";
import app from "../src/app.js";

describe("GET /tasks", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/tasks").send();
      expect(response.statusCode).toBe(200);
    });

    test("should respond an array", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
      });

})

describe("POST /tasks", () => {
    describe("given a title and description", () => {
      const newTask = {
        title: "some title",
        description: "some description",
      };

      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/tasks").send(newTask);
        expect(response.statusCode).toBe(200);
      });
  
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(app).post("/tasks").send(newTask);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      test("should respond with an task ID", async () => {
        const response = await request(app).post("/tasks").send(newTask);
        expect(response.body.id).toBeDefined();
      });
    });
  
    describe("when the title and description is missing", () => {

      test("shoud respond with a 400 status code", async () => {
        const fields = [
          { title: "some title" },
          { description: "some description" },
        ];
  
        for (const body of fields) {
          const response = await request(app).post("/tasks").send(body);
          expect(response.statusCode).toBe(400);
        }
      });
    });
  });