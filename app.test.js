import app from "./app.js";
import request from "supertest"

describe("App Test", () => {
    // test is an alternative to the it keyword, use which ever mkaes the test code read better
    test("Get /", async () => {
        // pass app to request
        const res = await request(app).get("/")
        // console.log(res.header)
        // Check Status code is correct (200 in the case of GET)
        expect(res.status).toBe(200) 
        // check the headers are set to return JSON (toContain() matches a substring) 
        //Alternatively toMatch() matches a substring based on REGEX
        expect(res.header["content-type"]).toContain("json")
        // Check that the response has the correct content structure in this case object with a location property
        expect(res.body.location).toBeDefined()
        // check the response has returned the correct item
        expect(res.body.location).toBe("Home")
    })

    describe("POST / entries", ()=>{
        let cats
        let res
        beforeAll(async () => {
            // need to get categories to get hte cat_id
            cats = await request(app).get("/categories")
            res  = await request(app).post("/entries").send({
                "category": cats.body[0]._id,
                "content": "Jest Automated Test Content2"
            })
        })
        afterAll(async () => {
            //clean up post from the database
            request(app).delete("/entries/" + res.body._id)
        })

        test("Returrns JSON with 201 Status", () => {
            expect(res.status).toBe(201)
            expect(res.header["content-type"]).toContain('json')

        })
        test("POST Returns correct structure", () => {
            // test response has the correct structure
            expect(res.body._id).toBeDefined()
            expect(res.body.content).toBeDefined() 
            expect(res.body.category).toBeDefined()
        })
        test("Category is object with ID and Name", () => {
            expect(res.body.category).toBeInstanceOf(Object)
            expect(res.body.category._id).toBeDefined()
            expect(res.body.category.name).toBeDefined()
        })
        test("POST Returns correct category.name & content", () => {
            //expect content to equal the content send through
            expect(res.body.category._id).toBe(cats.body[0]._id)
            expect(res.body.content).toBe("Jest Automated Test Content2")
        })

    })

    describe("Get /categories", () => {
        let res
        beforeEach(async ()=>{
            res = await request(app).get("/categories")
        })
        test("Returns JSON content", () => {
                expect(res.status).toBe(200) 
                expect(res.header["content-type"]).toContain("json")
        })
        test("Returns an Array", () => {
                // is the body an array?
                expect(res.body).toBeInstanceOf(Array)
        })
        test("Array ahs 4 elements", () => {
                // does the array have 4 elements? - this should be runn off seed data so you can know what the return should be
                expect(res.body.length).toBe(4)
        })
        test("Array contents are correct", () => {
            // match an exact route 
            expect(res.body[0].name).toBe("Coding")
            // match something in a specified an element  
            expect(res.body[2]).toMatchObject({ name: "Food"})
            // match body contains an array that contains an object that contains a string 
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ name: "Other" })
                ])
            )
        })
    })
})
        