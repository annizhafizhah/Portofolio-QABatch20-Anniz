const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Update Profile Feature", function () {
  it("1. Verifying Success Update Profile", async function () {     
    const responseLogin = await domain 
      .post("/login")
      .send({ email: "coba@gmail.com", password: "coba" });
    
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({name: "anniz"})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('Username Anda menjadi anniz');
    expect(response.body.message).to.eql('Berhasil Perbarui Profile');
    expect(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE')
  });

  it("2. Verifying Failed Update Profile without username", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "coba@gmail.com", password: "coba" });
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({ name: "" });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql('Username tidak boleh kosong');
    expect(response.body.message).to.eql('Gagal Update Profile');
    expect(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
  }); 
  it("3. Verifying Failed Update Profile with max username", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "coba@gmail.com", password: "coba" });
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({ name: "cobajasnjdnjnsandjnsajndjnasljndjnsajdnjsanjdnsajndjsnajdnsjndjsandjnsjndjsndjsndjsndjsnjdsnjdnsjdjsdnsjn" });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql('Username melebihin maksimal karakter');
    expect(response.body.message).to.eql('Gagal Update Profile');
    expect(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
  });  
  it("4. Verifying Failed Update Profile with symbol", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "coba@gmail.com", password: "coba" });
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({ name: "4ann!z" });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql('Nama tidak valid');
    expect(response.body.message).to.eql('Tidak boleh mengandung symbol');
    expect(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
  });  
  it("5. Verifying Success Update Profile with number", async function () {
    const responseLogin = await domain
      .post("/login")
      .send({ email: "coba@gmail.com", password: "coba" });
  
    const authToken = responseLogin.body.credentials.access_token;
    const response = await domain
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({ name: "4ann1z" });
  
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.body.data).to.eql('Username Anda menjadi 4ann1z');
    expect(response.body.message).to.eql('Berhasil Perbarui Profile');
    expect(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE');
  });    
});