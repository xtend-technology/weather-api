const App = require ('../app')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect()
const chaiHttp = require('chai-http');
const {mockReq, mockRes} = require('sinon-express-mock')
const request = require('request')

const should = chai.should();
chai.use(chaiHttp);

describe('Call function Sydney direct', function () {

      it('should call Sydney direct', (done) => {
        chai.request(App)
        .get('/weather/sydney')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
        
      });
    
  });

describe('Call Sydney function mock', function () {

      it('should call Sydney mocked', () => {
        const request = {
          body:{}
        }
        const req = mockReq(request)
        const res = mockRes()
        App.get('/weather/sydney', (req,res) => {
          expect(res.json).to.be.calledWith({})
          console.log('mocked sydney response', res)
          
        })

        
      });
    
  });

//   describe('Call Sydney forecast function mock', function () {

//     it('should call Sydney forecast mocked', () => {
//       const request = {
//         body:{}
//       }
//       const req = mockReq(request)

//       const response ={
//         description: "overcast clouds"
//       }
//       const res = mockRes(response)
//       App.get('/weather/sydney', (req,res) => {
//         console.log('mocked sydney response', res)
//         expect(res.statusCode).to.equal(201);
//         expect(res.json).to.deep.equal({
//           description: "overcast clouds1"
//         })
        
        
//       })

      
//     });
  
// });

describe('Sydney function stub', function () {

  
    before(() => {
    sinon.stub(request, 'get').yields({description: "overcast clouds"})
    })
    after(() => {
      request.get.restore();
  });
  it('should return Sydney forecast stubbed', () => {
    App.get('/weather/sydney/', (req,res) => {
      expect(res.statusCode).to.equal(201);
        expect(res.json).to.deep.equal({
          description: "overcast clouds1"
        })
      console.log('mocked sydney response', res)
      
    })

    
  });

});


