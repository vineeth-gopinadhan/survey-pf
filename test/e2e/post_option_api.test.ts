import request from 'supertest';
import { Server } from './../../server';
import DatabaseManager from '../../src/db';

describe('POST /v1/questions/:questionId/option', () => {
  const server = new Server();
  const app = server.createApp();
  const pg = new DatabaseManager();
  let result: any, surveyIds: number[], questionIds: number[];

  beforeEach(async () => {
    result = await pg.query(
      `INSERT INTO mst.survey (title) VALUES
    ('Customer Satisfaction Survey'),
    ('Employee Feedback Survey'),
    ('Product Feedback Survey') returning survey_id;`,
      [],
    );
    surveyIds = result.rows.map((row: { survey_id: number }) => row.survey_id);
    result = await pg.query(
      `INSERT INTO mst.question (survey_id, title, description, "order") VALUES
    ($1, 'How satisfied are you with our product?', 'Please rate your satisfaction on a scale of 1 to 5.', 1),
    ($3, 'What challenges do you face in your role?', 'Please provide your insights.', 3),
    ($2, 'How likely are you to recommend our product to others?', 'Please rate your likelihood on a scale of 1 to 10.', 1) returning question_id`,
      [surveyIds[0], surveyIds[1], surveyIds[2]],
    );
    questionIds = result.rows.map(
      (row: { question_id: number }) => row.question_id,
    );
    console.log(questionIds);
    console.log(surveyIds);
  });

  afterEach(async () => {
    await pg.query('DELETE FROM mst.option WHERE question_id = $1;', [
      questionIds[0],
    ]);
    await pg.query(
      `DELETE FROM mst.question WHERE question_id in ($1, $2, $3);`,
      [questionIds[0], questionIds[1], questionIds[2]],
    );
    await pg.query(`DELETE FROM mst.survey WHERE survey_id in ($1, $2, $3);`, [
      surveyIds[0],
      surveyIds[1],
      surveyIds[2],
    ]);
  });

  it('should create a new option', async () => {
    const optionData = {
      image_url: 'https://example.com/image.jpg',
      subtitle: 'Option subtitle',
      skip_to_question: questionIds[2],
      order: 1,
    };

    const response = await request(app)
      .post(`/v1/questions/${questionIds[0]}/option`)
      .send(optionData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'Successfully Posted Option',
    });
  });

  it('should return 500 if question id is invalid', async () => {
    const optionData = {
      image_url: 'https://example.com/image.jpg',
      subtitle: 'Option subtitle',
      skip_to_question: null,
      order: 1,
    };

    const response = await request(app)
      .post('/v1/questions/invalid_id/option')
      .send(optionData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'nok',
      error: 'Internal Server Error',
    });
  });
});
