const Sib = require("sib-api-v3-sdk");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SMTP_KEY;

exports.sendMail = async (email, subject, content) => {
  const sendSmtpEmail = new Sib.SendSmtpEmail();
  sendSmtpEmail.sender = { email: "97athulpm@gmail.com" };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.textContent = content;

  const apiInstance = new Sib.TransactionalEmailsApi();
  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(`Email sent to ${email}.`);
    return response;
  } catch (error) {
    console.log(error);
    console.error(`Error sending email to ${email}.`);
  }
};
