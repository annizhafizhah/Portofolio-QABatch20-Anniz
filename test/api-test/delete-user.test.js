const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario delete Profile Feature", function () {
  it("1. Verifying Success Delete Profile", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "dipti10@gmail.com", password: "dipti10"});
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .delete("/delete-user") // TODO: NANYAIN ENDPOINT
      .set("Authorization", `${authToken}`)
      .send({password: "diptiwis"})
    
      console.log(response.body); // Log the response for debugging

      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("status");

    expect(response.body.data).to.eql('Sedih melihatmu pergi Wisnt');
    expect(response.body.message).to.eql('Berhasil Hapus User');
    expect(response.body.status).to.eql('SUCCESS_DELETE_USER');
  });      
  it("2. Verifying Failed Delete Profile without password", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "dipti10@gmail.com", password: "dipti10"});
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .delete("/delete-user") // TODO: NANYAIN ENDPOINT
      .set("Authorization", `${authToken}`)
      .send({password: ""})
    
      console.log(response.body); // Log the response for debugging

      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("status");

    expect(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
    expect(response.body.message).to.eql('Gagal Hapus Akun');
    expect(response.body.status).to.eql('FAILED_DELETE_PROFILE');
  });  
  it("3. Verifying Failed Delete Profile with wrong password", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "dipti10@gmail.com", password: "dipti10"});
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .delete("/delete-user") // TODO: NANYAIN ENDPOINT
      .set("Authorization", `${authToken}`)
      .send({password: "dipti"})
    
      console.log(response.body); // Log the response for debugging

      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("status");

    expect(response.body.data).to.eql('Salah Password');
    expect(response.body.message).to.eql('Gagal Hapus Akun');
    expect(response.body.status).to.eql('FAILED_DELETE_PROFILE');
  });  
});
