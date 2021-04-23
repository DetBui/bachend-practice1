import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  BaseEntity,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  // @Column()
  // salt:string;

  @Column()
  password: string;

  async validatePass(password: string): Promise<boolean> {
    const hashPass = await bcrypt.compare(password, this.password);
    return hashPass;
  }
}
