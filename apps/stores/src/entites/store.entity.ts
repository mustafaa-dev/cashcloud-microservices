import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/abstract.entity';

@Entity('stores')
export class Store extends AbstractEntity<Store> {
  @Column()
  name: string;
}
