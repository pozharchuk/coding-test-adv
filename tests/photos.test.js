const request = require('supertest');
const winston = require('winston');
const http = require('http');
const createApp = require('../app');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

// TODO placed for the simplicity to run the tests
process.env.SIGNING_KEY = 'supersupersecret';

const app = createApp(logger);
const server = http.createServer(app);

// Utility function to log in and retrieve the token
async function getToken() {
  const res = await request(app)
    .get('/auth');
  return res.text;
}
describe('Photos API', () => {
  let token;

  beforeAll(async () => {
    token = await getToken();
  });

  // Test the add photo endpoint
  it('should add a photo to a specific category', async () => {
    const testPhoto = {
      categoryId: 1,
      photo_url: 'https://example.com/photo.jpg',
    };

    const res = await request(server)
      .post('/api/photos')
      .set('Authorization', `Bearer ${token}`)
      .send(testPhoto);

    expect(res.statusCode).toEqual(201);
  });

  // Test the delete photo endpoint
  it('should delete a photo by ID', async () => {
    const photoIdToDelete = '9999';

    const res = await request(server)
      .delete(`/api/photos/${photoIdToDelete}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
