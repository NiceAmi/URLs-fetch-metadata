const request = require('supertest');
const express = require('express');
const fetchMetaDataRoutes = require('../Routes/fetchMetaDataRoutes');
const connectToDB = require('../config/connectToDB');
const mongoose = require('mongoose');
const nock = require('nock');

const app = express();
app.use(express.json());
app.use('/api', fetchMetaDataRoutes);

beforeAll(async () => {
  await connectToDB(); 
});

afterAll(async () => {
  await mongoose.connection.close(); 
});

beforeEach(() => {
  nock('http://www.cnn.com')
    .get('/')
    .reply(200, '<html><head><title>CNN</title></head><body></body></html>');

  nock('http://www.invalid-url.com')
    .get('/')
    .replyWithError('Invalid URL');
});

describe('POST /api/fetch-metadata', () => {
  it('should return 400 if no URLs are provided', async () => {
    const response = await request(app).post('/api/fetch-metadata').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Please provide URLs in the request body');
  });

  it('should return metadata for valid URLs', async () => {
    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: ['http://www.cnn.com', 'http://www.bbc.com', 'http://www.nytimes.com'] });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toBe('CNN');
  });
  
  it('should handle invalid URLs gracefully', async () => {
    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: ['http://www.invalid-url.com', 'http://www.cnn.com', 'http://www.bbc.com'] });
    expect(response.status).toBe(200);
    expect(response.body[0].error).toBe('Failed to fetch metadata');
  });
  
});

it('handles unexpected errors during URL fetching', async () => {
  nock('http://www.example.com')
    .get('/')
    .replyWithError(new Error('Unexpected network error'));

  const response = await request(app)
    .post('/api/fetch-metadata')
    .send({ urls: ['http://www.example.com'] });

  expect(response.status).toBe(500);
  expect(response.body.error).toMatch(/Internal server error/i);
});

it('should return 400 if required field "urls" is missing', async () => {
  const response = await request(app).post('/api/fetch-metadata').send({});
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Please provide URLs in the request body');
});