/* @TODO Fix tihs test */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,

      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should return an access token', async () => {
      const createUserDto = {
        username: 'testuser1',
        email: 'testuser1@testmail.com',
        password: 'testpassword1',
      };
      const createUserResponse = await service.createUser(createUserDto);
      expect(createUserResponse).toMatchObject({
        accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/), // JWT regex
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
