const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario List User Feature", function () {
  it("1. Verifying Success Get List User", async function () { 
    const email = "jokotampan900@gmail.com";

    const response = await domain 
      .get("/list-user")
      .query({email})
    
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    
  });
  it("2. Verifying Success Get List User Filtered by Role", async function () {
    const response = await domain
      .get("/list-user")
      .query({ role: "admin" });
  
    // Expectations untuk sukses mendapatkan list user
    expect(response.body).to.include.keys("data", "message", "pagination", "status");
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body.data).to.be.an('array').that.is.not.empty;
  });
  it("3. Verifying Success Get List User With Start and End Date Parameters", async function () {
    const response = await domain
      .get("/list-user")
      .query({ startDate: "2023-01-01", endDate: "2023-01-31" });
  
    // Expectations untuk sukses mendapatkan list user
    expect(response.body).to.include.keys("data", "message", "pagination", "status");
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body.data).to.be.an('array').that.is.not.empty;
  });
  it("4. Verifying Success Get List User with Search Parameter", async function () {
    const response = await domain
      .get("/list-user")
      .query({ search: "joko" });
  
    // Expectations untuk sukses mendapatkan list user
    expect(response.body).to.include.keys("data", "message", "pagination", "status");
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body.data).to.be.an('array').that.is.not.empty;
  });

});