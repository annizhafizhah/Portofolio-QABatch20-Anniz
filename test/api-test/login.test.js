const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Login Feature", function () {
  it("1. Verifying Success Login with valid email and password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "dipti10@gmail.com", 
              password: "dipti10" 
            });
      
    expect(response.body).to.include.keys("data", "message", "status", "credentials"); 
    expect(response.body.status).to.eql('SUCCESS_LOGIN');
    expect(response.body.message).to.eql('Anda Berhasil Login');
  });
  it("2. Verifying Failed Login with Incorrect Password", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "coba@gmail.com", 
            password: "passwordsalah" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Email atau Password Anda Salah');
  });
  it("3. Verifying Failed Login with max email", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "cobaashdksdsncmxzncldjnvjdosidjaksljdiwjdaslkdjskdjiwaljdskjfjsifjwiijfiwjjijiajdisids@gmail.com", 
            password: "passwordsalah" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Email/Password melebihin maksimal karakter');
  });
  it("4. Verifying Failed Login with min email", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "a@gmail.com", 
            password: "passwordsalah" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Email atau Password Anda Salah');
  });
  it("5. Verifying Failed Login without domain", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "anniz", 
            password: "passwordsalah" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Cek kembali email anda');
  });
  it("6. Verifying Failed Login with domain in password", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "annha@gmail.com", 
            password: "p@gmail.com" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Tidak boleh mengandung symbol');
  });
  it("7. Verifying Failed Login with email reversed", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "@gmail.comannha", 
            password: "anniz" 
            });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Cek kembali email anda');
  });
})