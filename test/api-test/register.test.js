const domain = require("supertest")("http://barru.pythonanywhere.com"); //framework supertest
const expect = require("chai").expect; //framework chai

describe("Scenario Register Feature", function () {
    it("1. Verifying Success Register", async function () {
        const response = await domain //"response" sesuaikan dengan expect response body
            .post("/register")
            .send({ email: "annhah@gmail.com", 
                    password: "anniz", 
                    name:"anniz" 
                });

        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('SUCCESS_REGISTER');
        expect(response.body.data).to.eql('berhasil');
        expect(response.body.message).to.eql('created user!');
        expect(response.statusCode).to.eql(200)
    }).timeout(10000);
    it("2. Verifying Failed Register With Duplicate Email Address", async function () {
        const response = await domain //"response" sesuaikan dengan expect response body
            .post("/register")
            .send({ email: "dipti29@gmail.com", 
                    password: "dipti29", 
                    name:"Wisnt" 
                });

        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('FAILED_REGISTER');
        expect(response.body.data).to.eql('Email sudah terdaftar, gunakan Email lain');
        expect(response.body.message).to.eql('Gagal Registrasi');
        expect(response.statusCode).to.eql(420)
    }).timeout(10000);
    it("3. Verifying Success Register With symbol email", async function () {
        const response = await domain //"response" sesuaikan dengan expect response body
            .post("/register")
            .send({ email: "di.tip@gmail.com", 
                    password: "dipti29", 
                    name:"Wisnt" 
                });

        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('SUCCESS_REGISTER');
        expect(response.body.data).to.eql('berhasil');
        expect(response.body.message).to.eql('created user!');
        expect(response.statusCode).to.eql(200)
    }).timeout(10000);
    it ("4. Verifying Failed Register Without Email", async function () {
        const response = await domain
            .post("/register")
            .send({ 
                    email: "",    
                    password: "password123", 
                    name: "Anniz" 
            });
    
        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('FAILED_REGISTER');
        expect(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
        expect(response.body.message).to.eql('Gagal Registrasi');
        expect(response.statusCode).to.eql(420);
    }).timeout(10000);
    it("5. Verifying Failed Register Without Password", async function () {
        const response = await domain
            .post("/register")
            .send({ 
                email: "anniz@gmail.com",
                password: "", 
                name: "Anniz" 
            });
    
        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('FAILED_REGISTER');
        expect(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
        expect(response.body.message).to.eql('Gagal Registrasi');
        expect(response.statusCode).to.eql(420);  
    }).timeout(10000);
    it("6. Verifying Failed Register Without domain email", async function () {
        const response = await domain //"response" sesuaikan dengan expect response body
            .post("/register")
            .send({ email: "dipti29", 
                    password: "dipti29", 
                    name:"Wisnt" 
                });

        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('FAILED_REGISTER');
        expect(response.body.data).to.eql('Email tidak valid');
        expect(response.body.message).to.eql('Cek kembali email anda');
        expect(response.statusCode).to.eql(420)
    }).timeout(10000);
    it("7. Verifying Failed Register With email and password exchanged", async function () {
        const response = await domain //"response" sesuaikan dengan expect response body
            .post("/register")
            .send({ email: "dipti", 
                    password: "dipti29@gmail.com", 
                    name:"Wisnt" 
                });

        expect(response.body).to.include.keys("data", "message", "status");
        expect(response.body.status).to.eql('FAILED_REGISTER');
        expect(response.body.data).to.eql('Email tidak valid');
        expect(response.body.message).to.eql('Cek kembali email anda');
        expect(response.statusCode).to.eql(420)
    }).timeout(10000);
})