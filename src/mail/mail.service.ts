import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as otpGenerator from 'otp-generator';
import { Otp } from 'src/otp/models/otp.model';
import { AddMinutesToDate } from 'src/helpers/addMinutes';

@Injectable()
export class MailService {
    constructor(
        private mailService: MailerService,
        @InjectModel(Otp) private otpRepository: typeof Otp,
    ) { }

    async sendOtpToEmail(user: any): Promise<void> {
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        const now = new Date();
        const expiration_time = AddMinutesToDate(now, 5);
        await this.otpRepository.create({ otp, expiration_time, check: user.email });
        await this.mailService.sendMail({
            to: user.email,
            subject: "Assalomu alaykum. Avto ijara saytiga xush kelibsiz!",
            template: './confirmation',
            context: {
                name: user.full_name,
                otp,
            }
        })
    }
}
