import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendNewsletterEmail(user: any, emailData: any){
        await this.mailerService.sendMail({
            to: user.email,
            from: emailData.from,
            subject: emailData.subject,
            template: emailData.template, 
            context: {
                data: emailData,
            },
        });
    }
}
