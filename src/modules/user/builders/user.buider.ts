import { User } from '../dtos/user';
import { BuildedUserDTO } from '../dtos/responses/builded-user.dto';

export class UserBuilder {
  static buildUser(user: User): BuildedUserDTO {
    const { email, name, pictureUrl } = user;
    return { email, name, pictureUrl };
  }
}
