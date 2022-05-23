// process.env.NODE_ENV = 'test'; set in package.json
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
const Faculty = require('../src/models/Faculty');
const Application = require('../src/models/Application');

describe("Create Achievement", () => {

  var token="";
  var studentID="";
  var facultyID="";
// Create Application  
  beforeEach((done) => {
      Student.create({
          studentID:"181071111",
          name: "test namefdwbfrgr",
          email: "student101@gmail.com",
          password: "12345678",
          department: "Computer Engineering",
          degree: "BTech",
          admissionYear: 2018
      }).then((student) => {
          studentID = student._id.toString();
          token = signToken(studentID);
          Faculty.create({
            facultyID:"181071095",
            name: "faculty 1",
            email: "faculty5@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            position: "BTech",
            description:"HOD"
        }).then((faculty) => {
            facultyID = faculty._id.toString();
        });
        done();
      });
    
  })

   afterEach(( done) => {
      Student.deleteMany().then(()=>{
        Faculty.deleteMany().then(()=>{
            done();
        })
        });
  })

 
   describe("POST /api/applications/new", () => {
    
      it("returns 400 when all details are not given", (done) => {
        const incompleteAchievement = {
            studentID: studentID,
            facultyID: facultyID,
            description: "Achievement Creation",
        };   
          chai
              .request(app)
              .post("/api/applications/apply")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...incompleteAchievement })
              .end((err, res) => {
                 // expect(err).to.be.null;
                  expect(res.status).to.be.equal(400);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("message").not.equal("");
                  done();
              });
      });
  });

});


// Get Student Applications
 
describe("Get Student Application Achievements", () => {

    var token="";
    var studentID="";  
    beforeEach((done) => {
        Student.create({
            studentID:"181071055",
            name: "test namefdwbfrgr",
            email: "student5@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {
            studentID = student._id.toString();
            token = signToken(studentID);
          done();
        });
    })
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
              done();
          })
    })
  
   
     describe("POST /api/student/id/applications", () => {

        it("returns 200 to retireve student applications", (done) => {

              chai
                  .request(app)
                  .get("/api/student/"+studentID+"/applications")
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                     // expect(err).to.be.null;
                      expect(res.status).to.be.equal(200);
                      // expect(res.body).to.be.an("object");
                      // expect(res.body).to.have.property("message").not.equal("");
                      done();
                  });
          });
     });
});  


// Get Faculty Applications
 
describe("Get achievements submitted to a faculty", () => {

    var token="";
    var studentID="";
    var facultyID="";
    const userType="student";
    var achievement={};
  
   
    beforeEach((done) => {
        Faculty.create({
              facultyID:"181071099",
              name: "faculty 1",
              email: "faculty4@gmail.com",
              password: "12345678",
              department: "Computer Engineering",
              position: "BTech",
              description:"HOD"
          }).then((faculty) => {
              facultyID = faculty._id.toString();
              token = signToken(facultyID);
              done();
          });
         
    
      
    })
  
     afterEach(( done) => {
      
          Faculty.deleteMany().then(()=>{
              done();
          })
        
    })
     describe("POST /api/faculty/id/applications", () => {

        it("returns 200 to retireve faculty applications", (done) => {

              chai
                  .request(app)
                  .get("/api/faculty/"+facultyID+"/applications")
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                     // expect(err).to.be.null;
                      expect(res.status).to.be.equal(200);
                      // expect(res.body).to.be.an("object");
                      // expect(res.body).to.have.property("message").not.equal("");
                      done();
                  });
          });
     });
});  



// View Application Detail, Approve, Reject
describe("View Achievement Details, accordingly Approve or Reject", () => {

    var token="";
    var studentID="";
    var facultyID="";
    var applicationID="";
    beforeEach((done) => {
        Student.create({
            studentID:"181071033",
            name: "test namefdwbfrgr",
            email: "student9@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {   
            studentID = student._id.toString();
            token = signToken(studentID);
            Faculty.create({
              facultyID:"181071023",
              name: "faculty 1",
              email: "faculty4@gmail.com",
              password: "12345678",
              department: "Computer Engineering",
              position: "BTech",
              description:"HOD"
          }).then((faculty) => {
              facultyID = faculty._id.toString();
             Application.create({
            studentID:studentID,
            facultyID: facultyID,
            title: "application 1",
            description:"HOD",
            organisedBy:"VJTI",
            startDate: new Date("2016-05-18T16:00:00Z"),
            ocrText:"testocrtext"
        }).then((application) => {
            applicationID = application._id.toString();
        
          done();
        }).catch(done);
        ;
    });
});
})
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
          Faculty.deleteMany().then(()=>{
            Application.deleteMany().then(()=>{
                done();
            })
        
          })
          });
    })

     describe("POST /api/applications/id", () => {
      
        it("returns 200 to fetch all details of an application", (done) => {
         
            chai
                .request(app)
                .get("/api/applications/"+applicationID)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });


    describe("POST /api/applications/id/approve", () => {
      
        it("returns 200 when application is approved", (done) => {
         const applicationToApprove={
facultyID: facultyID,
reward:30
         }

      
            chai
                .request(app)
                .post("/api/applications/"+applicationID+"/approve")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...applicationToApprove })
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });

    describe("POST /api/applications/id/approve", () => {
      
        it("returns 500 when application ID is wrong", (done) => {
         const applicationToApprove={
facultyID: facultyID,
reward:30
         }

         var invalidApplicationID="dsjcni12243534"
            chai
                .request(app)
                .post("/api/applications/"+invalidApplicationID+"/approve")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...applicationToApprove })
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(500);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });


    describe("POST /api/applications/id/reject", () => {
      
        it("returns 200 when application is rejected", (done) => {
        
            chai
                .request(app)
                .post("/api/applications/"+applicationID+"/reject")
                .set('Authorization', `Bearer ${token}`)
                .send({})
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });
  
  });
  
  

