import request from 'supertest'
import app from '../config/app'

describe('Body parses Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send({ name: 'Ana' })
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Ana' })
      .expect({ name: 'Ana' })
  })
})
