import nodemailer from 'nodemailer';
import { getEnvVariables } from './getEnvVariables';
import { SMTP } from '../constants/constants';
import { Options } from '../types/sendEmail';

const transporter = nodemailer.createTransport({
  host: getEnvVariables(SMTP.SMTP_HOST),
  port: Number(getEnvVariables(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVariables(SMTP.SMTP_USER),
    pass: getEnvVariables(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options: Options) => {
  return await transporter.sendMail(options);
};
