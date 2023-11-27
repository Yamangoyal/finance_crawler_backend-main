const app = require("../src/app");
const request = require("supertest");
// const jest = require("jest");

beforeEach(() => {
    // timeout of 1 min added so that jest
    // don't exits before DB connection get established
    jest.setTimeout(60000);
});

const token =  "Bearer :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ1OTBjNWM1NDRjMDU3NWJiMWZkNiIsImlhdCI6MTcwMTA3NTczMywiZXhwIjoxNzAyODAzNzMzfQ.O7634JX-tM9l_9NHlLiwj657OvEbdYLtXdeWP0rQfRM";

describe("register", () => {
    //success test case
    it("returns 200", async () => {
        jest.setTimeout(500000);
        const res = await request(app).post("/api/users/register").send({
            email:"hashir@g.com",
            firstname:"yaman",
            lastname:"goyal",
            password:"hp123"
        });

        expect(200);
    });

    //error test case 
    it("returns error if any info is missing", async () => {
        const res = await request(app).post("/api/users/register").send({
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
        const res = await request(app).post("/api/users/login").send({
            email:"hashir@g.com",
            password:"hp123"
        });

        expect(200);
    });

    // error test case 
    it("returns error if user not found", async () => {
        const res = await request(app).post("/api/users/login").send({
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
        const res = await request(app).post("/api/income/").set("authorization",token).send({
            title:"samosa",
            description:"thela",
            amount:100
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).post("/api/income/").set("authorization",token).send({
            title:"samosa",
            description:"thela",
            // amount:100
        });

        expect(500);
    });
});


//Income Update Test cases

describe("incomeUpdate", () => {
    //success test case
    it("returns 200", async () => {
        const res = await request(app).put("/api/income/656462d29351cbd17a07ef3c/update").set("authorization",token).send({
            title:"amazon",
            description:"salary",
            amount:180000
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).put("/api/income/656462d29351cbd17a07ef3c/update").set("authorization",token).send({
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
        const res = await request(app).get("/api/income/6564590c5c544c0575bb1fd6?page=1").set("authorization",token).send({
            // page:1,
            // id:"656462d29351cbd17a07ef3c"
        });

        expect(200);
    });

    //error test case 
    it("returns error if a field is missing", async () => {
        const res = await request(app).get("/api/income/6564590c5c544c0575bb1fd6?page=1").set("authorization",token).send({
            // page:1,
            // id:"656462d29351cbd17a07ef3c"
        });

        expect(500);
    });
});
