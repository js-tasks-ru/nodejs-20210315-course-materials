const {expect} = require('chai');
const axios = require('axios');
const sinon = require('sinon');

const APIClient = require('./003-mocks');

const getRandomPhotoResponse = () => ({
  "id": "Dwu85P9SOIk",
  "created_at": "2016-05-03T11:00:28-04:00",
  "updated_at": "2016-07-10T11:00:01-05:00",
  "width": 2448,
  "height": 3264,
  "color": "#6E633A",
  "downloads": 1345,
  "likes": 24,
  "liked_by_user": false,
  "description": "A man drinking a coffee.",
  "exif": {
    "make": "Canon",
    "model": "Canon EOS 40D",
    "exposure_time": "0.011111111111111112",
    "aperture": "4.970854",
    "focal_length": "37",
    "iso": 100
  },
  "location": {
    "city": "Montreal",
    "country": "Canada",
    "position": {
      "latitude": 45.4732984,
      "longitude": -73.6384879
    }
  },
  "urls": {
    "raw": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
    "full": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg",
    "regular": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max",
    "small": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max",
    "thumb": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max"
  },
});

describe('APIClient', () => {
  describe('getRandomPhoto', () => {

    it('should return random photo data', async () => {

      const clientId = 'clientId';
      const requestMock = sinon.mock(axios)
        .expects('request')
        .once()
        .resolves(getRandomPhotoResponse())

      const client = new APIClient(clientId, axios)

      const result = await client.getRandomPhoto()

      expect(result).to.be.equal(getRandomPhotoResponse().urls.raw)

      requestMock.verify()
    });

    it('should return an error if any', async () => {
      const clientId = 'clientId';
      const error = new Error('something went wrong');
      error.code = 401;
      const http = {
        request: sinon.stub().onFirstCall().rejects(error)
      }

      const client = new APIClient(clientId, http)

      await expect(client.getRandomPhoto()).to.eventually.rejectedWith(error)

    });
  });
});


