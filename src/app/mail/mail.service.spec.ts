import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { Repository } from 'typeorm';
import { SaveMailDto } from './dto/save-mail.dto';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          //definição do repositório
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(
      getRepositoryToken(MailEntity),
    );
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });
  describe('save', () => {
    it('should save a new mail with sucess', async () => {
      const data: SaveMailDto = {
        destinationName: 'user da silva',
        destinationAddress: 'user@mail.com',
        dueDate: '2024-03-15!T13:00:00Z',
        subject: 'Assunto do email',
        body: 'corpo do email',
      };
      const MailEntityMock = {
        ...data,
      } as MailEntity;

      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(MailEntityMock);

      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(MailEntityMock);

      const result = await mailService.save(data);

      expect(result).toBeDefined();
      expect(mailRepository.create).toHaveBeenCalledTimes(1);
      expect(mailRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
