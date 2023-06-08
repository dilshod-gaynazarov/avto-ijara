import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from 'src/otp/models/otp.model';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAILER_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAILDEV_USER'),
            pass: config.get<string>('MAILDEV_PASS')
          }
        },
        defaults: {
          from: `"Avto ijara" <${config.get('MAILER_HOST')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          templates: 'confirmation',
          options: {
            strict: true,
          }
        }
      }),
      inject: [ConfigService]
    }),
    SequelizeModule.forFeature([Otp]),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
