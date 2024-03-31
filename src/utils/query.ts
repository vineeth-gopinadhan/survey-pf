const Query: any = {};

Query.Insert_Option =
  'INSERT INTO mst.option (question_id, image_url, subtitle, skip_to_question, "order", created_at, updated_at)\
VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';

export default Query;
