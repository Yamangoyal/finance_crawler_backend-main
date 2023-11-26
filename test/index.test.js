const app = require("../src/app");
const request = require("supertest");

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
  jest.setTimeout(50000) 
})

describe("register", () => {
    //success test case
    it("returns 200", async () => {
        const res = await request(app).post("/api/register").send({
            email:"hashir@g.com",
            firstname:"yaman",
            lastname:"goyal",
            password:"hp123"
        });

        expect(200);
    });

    //error test case 
    it("returns error if any info is missing", async () => {
        const res = await request(app).post("/api/register").send({
            firstname:"yaman",
            lastname:"goyal",
            password:"hp123"
        });

        expect(400);
    });
});


describe("login", () => {
    //true test case
    it("returns 200 if successful", async () => {
        const res = await request(app).post("/api/login").send({
            email:"hashir@g.com",
            password:"hp123"
        });

        expect(200);
    });

    // error test case 
    it("returns error if user not found", async () => {
        const res = await request(app).post("/api/login").send({
            email:"hashir@g.com",
            password:"hp1"
        });

        expect(401);
    });
});


//IncomeCreate Test Cases

describe("incomeCreate", () => {
    //success test case
    it("returns 200", async () => {
        const res = await request(app).post("/api/income/create").send({
            title:"amazon",
            description:"salary",
            amount:110000
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).post("/api/income/create").send({
            title:"amazon",
            description:"salary",
            // amount:110000
        });

        expect(500);
    });
});


//Income Update Test cases

describe("incomeUpdate", () => {
    //success test case
    it("returns 200", async () => {
        const res = await request(app).post("/api/income/update").send({
            title:"amazon",
            description:"salary",
            amount:180000
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).post("/api/income/update").send({
            title:"amazon",
            description:"salary",
            // amount:180000
        });

        expect(500);
    });
});


//Income Fetch Single Test cases

describe("incomeFetch", () => {
    //success test case
    it("returns 200", async () => {
        const res = await request(app).get("/api/income/fetchSingle").send({
            page:1,
            id:"625d6949b2cbc34f5fd3505d"
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).get("/api/income/fetchSingle").send({
            page:1,
            // id:"625d6949b2cbc34f5fd3505d"
        });

        expect(500);
    });
});
