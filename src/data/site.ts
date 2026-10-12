/** 個人聯絡資料：首頁聯絡面板、關於頁與聯絡頁共用。 */
export const contact = {
  email: "mtwmt@hotmail.com",
  github: "https://github.com/mtwmt",
  /** 聯絡表單送到 Google Apps Script；只在聯絡頁腳本裡使用，不要寫進 HTML。 */
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbz411s_MI3t6B2-4fKV5O139Me4cFEIa0PCDV0SlRD_XPYfhepA3P9J3c4KDoVJElgA/exec",
  /** 由腳本附加的欄位，Apps Script 的 doPost 檢查它來擋掉直接 POST 的機器人。 */
  formKey: "mtwmt-contact-v1",
};
