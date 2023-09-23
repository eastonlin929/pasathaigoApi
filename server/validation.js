const Joi = require("joi");

//使用者註冊時必須先通過此function檢測
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.base": "名字必須是一個文字串",
      "string.empty": "名字不能為空",
      "string.min": "名字不能小於 {#limit} 個字",
      "string.max": "名字不能大於 {#limit} 個字",
      "any.required": "名字為必填欄位",
    }),
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.empty": "信箱不能為空",
      "string.min": "信箱不能小於 {#limit} 個字",
      "string.max": "信箱不能大於 {#limit} 個字",
      "any.required": "信箱為必填欄位",
    }),
    password: Joi.string().min(8).max(255).required().messages({
      "string.empty": "密碼不能為空",
      "string.min": "密碼不能小於 {#limit} 個字",
      "string.max": "密碼不能大於 {#limit} 個字",
      "any.required": "密碼為必填欄位",
    }),
  });
  return schema.validate(data);
};

//登入檢測
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.email": "請輸入有效的電子郵件地址",
      "string.empty": "電子郵件地址不能為空",
      "any.required": "電子郵件地址為必填欄位",
    }),
    password: Joi.string().min(8).max(255).required().messages({
      "string.empty": "密碼不能為空",
      "string.min": "密碼不能小於 {#limit} 個字",
      "string.max": "密碼不能大於 {#limit} 個字",
      "any.required": "密碼為必填欄位",
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
