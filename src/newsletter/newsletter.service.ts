import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Newsletter } from './entities/newsletter.entity';
import { MailService } from '../mail/mail.service'

@Injectable()
export class NewsletterService {

  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository : Repository<Newsletter>,
    private mailService: MailService
  ){}

  async create(createNewsletterDto: CreateNewsletterDto) {
    const {name, email, message} = createNewsletterDto;
    const newsletter = await this.newsletterRepository.findOneBy({email: createNewsletterDto.email})
    if(newsletter){
      const errors = {email: 'Already subscribe to our newsletter'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    }
    const insertNewsletter = await this.newsletterRepository.save(createNewsletterDto);

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    let newNewsletter = new Newsletter();
    newNewsletter.name = name;
    newNewsletter.email = email;
    newNewsletter.message = message;
    const emailData = {
      subject: 'Thanks for subscribing Our Newsletter',
      template: './newsletter',
      token: token
    };

    await this.mailService.sendNewsletterEmail(newNewsletter, emailData);
    
    return insertNewsletter
  }
}
