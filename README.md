# Survey-PF

This service stores surveys and response data.

### Requirements

Each survey is made up of a series of questions that can have any number of options. Survey respondents may only select one option per question.

Selecting some options should cause certain questions to be skipped out (commonly known as ‘skip logic’). For example, the survey creator might say that selecting ‘Option B’ in question 3 takes the respondent straight to question 6, skipping out questions 4 and 5.

Surveys and questions are given titles, but options are composed of images with a text subtitle.

We also need to design the database architecture for storing the response data (the options that survey respondents select). We need to be able calculate three things from this data:

1. The number of times each option is selected across all respondents
2. The number of respondents who complete the survey (remember that some respondents will automatically skip questions, but should still be considered ‘completed’)
3. The number of respondents who exit the survey on a given question (this is the same as someone viewing a question and not answering it)

### Important links

1. [ERD](https://github.com/vineeth-gopinadhan/survey-pf/blob/master/docs/ERD/er_survey_db.png)
2. [Migration SQL](https://github.com/vineeth-gopinadhan/survey-pf/blob/master/migrations/sqls/20240331122012-survey-v1-initial-migration-up.sql)
3. [Postman Script](https://github.com/vineeth-gopinadhan/survey-pf/tree/master/docs/postman)


### To Do

1. Move credentials to env file
2. Include image upload feature in POST Options API (Use multer https://www.npmjs.com/package/multer/v/2.0.0-rc.4)
3. Add proper schema validation for request. (Use AJV validator (https://www.npmjs.com/package/ajv))
4. Add DB validation for params like question_id, option_id, skip_to_question etc.
5. Improve e2e and unit test coverage.
6. Create swagger documentation.
