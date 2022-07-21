import Joi from "joi";

const qnaSearchJoi = Joi.object({
  lastId: Joi.string(),
});

const qnaCreateJoi = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  contents: Joi.string().required(),
  contentText: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  isAnswer: Joi.boolean().required(),
  parentQnaId: Joi.string(),
});

const qnaUpdateJoi = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  contents: Joi.string().required(),
  contentText: Joi.string().required(),
  recommends: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  isAnswer: Joi.boolean().required(),
  parentQnaId: Joi.string(),
});

const qnaRecommendJoi = Joi.object({
  recommended: Joi.boolean(),
});

export { qnaSearchJoi, qnaCreateJoi, qnaUpdateJoi, qnaRecommendJoi };