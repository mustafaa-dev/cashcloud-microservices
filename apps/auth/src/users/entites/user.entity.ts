import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/abstract.entity';
// import { License } from '../../../src/modules/license/license.entity';
// import { Role } from '../../../src/modules/role/role.entity';
// import { Payment } from '../payment/payment.entity';
// import { Log } from '../log/log.entity';

@Entity('user')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  // @Column({ unique: true })
  // phone: string;
  //
  // @Column({ default: true })
  // active: boolean;
  //
  // @Column({
  //   default:
  //     'https://res.cloudinary.com/dp2f96bxe/image/upload/v1690846327/user_vrv06i.png',
  // })
  // picture: string;
  //
  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   select: false,
  // })
  // passwordChangedAt: Date;
  //
  // @Column({ select: false, default: ' ' })
  // passwordResetToken: string;
  //
  // @Column({ select: false, default: () => 'CURRENT_TIMESTAMP' })
  // passwordResetExpiration: Date;
  //
  // @Column({ default: false })
  // shift: boolean;
  //
  // @Column({ default: () => 'CURRENT_TIMESTAMP' })
  // startShift: Date;
  //
  // @Column({ default: () => 'CURRENT_TIMESTAMP' })
  // endShift: Date;

  // @OneToOne(() => License, (license) => license.owner)
  // @JoinColumn()
  // license: License;
  //
  // @ManyToOne(() => Role, (role) => role.users)
  // role: Role;
  //
  // @OneToMany(() => Payment, (payment) => payment.user)
  // payments: Payment[];
  //
  // @OneToMany(() => Log, (log) => log.user)
  // logs: Log[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }
}
