import nodemailer from 'nodemailer';
import { getEnvVariables } from './getEnvVariables';
import { SMTP } from '../constants/constants';
import { Options } from '../types/sendEmail';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: getEnvVariables(SMTP.SMTP_HOST),
  port: Number(getEnvVariables(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVariables(SMTP.SMTP_USER),
    pass: getEnvVariables(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options: Options) => {
  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
