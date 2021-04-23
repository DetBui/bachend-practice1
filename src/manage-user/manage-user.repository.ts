import { Repository, EntityRepository } from 'typeorm';
import { User } from '../user/user.entity';

@EntityRepository(User)
export class ManageUserRepository extends Repository<User> {}
