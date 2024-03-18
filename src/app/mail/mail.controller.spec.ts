import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailEntity } from './mail.entity';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailController).toBeDefined();
    expect(mailService).toBeDefined();
  });
  describe('save', () => {
    it('should save a new mail sith success', async () => {
      const body: SaveMailDto = {
        destinationName: 'user da silva',
        destinationAddress: 'user@mail.com',
        dueDate: '2024-03-15!T13:00:00Z',
        subject: 'Assunto do email',
        body: 'corpo do email',
      };
      const MailEntityMock = {
        ...body,
      } as MailEntity;

      jest.spyOn(mailService, 'save').mockResolvedValueOnce(MailEntityMock);
      const result = await mailController.save(body);
      expect(result).toBeDefined();
      expect(mailService.save).toHaveBeenCalledTimes(1);
    });
  });
});
