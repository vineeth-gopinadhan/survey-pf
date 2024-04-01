const Query: any = {};

Query.Insert_Option =
  'INSERT INTO mst.option (question_id, image_url, subtitle, skip_to_question, "order", created_at, updated_at)\
VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';

Query.Get_Options =
  'SELECT * FROM mst.option WHERE question_id = $1 ORDER BY "order" ASC;';

Query.Delete_Option = 'DELETE FROM mst.option WHERE option_id = $1;';

Query.Update_Option = `UPDATE mst.option
SET 
    question_id = $2,
    image_url = $3,
    subtitle = $4,
    skip_to_question = $5,
    "order" = $6,
    updated_at = CURRENT_TIMESTAMP
WHERE option_id = $1;`;

export default Query;
