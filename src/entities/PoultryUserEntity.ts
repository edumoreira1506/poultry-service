
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Poultry from './PoultryEntity'

@Entity('poultry_users')
export default class PoultryUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id'})
  userId: string;

  @Column({ type: 'uuid', name: 'poultry_id'})
  poultryId: string;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Poultry, poultry => poultry.users)
  @JoinColumn({ name: 'poultry_id' })
  poultry: Poultry;
}
