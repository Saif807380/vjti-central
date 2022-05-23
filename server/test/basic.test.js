const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);

describe("Basic test", () => {
  it("gets without error", (done) => {
    chai
      .request(app)
      .get("/api/check")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.equal("Connected");
        done();
      });
  });
});
