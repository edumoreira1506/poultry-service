
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Breeder from './BreederEntity'

@Entity('breeder_users')
export default class BreederUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id'})
  userId: string;

  @Column({ type: 'uuid', name: 'breeder_id'})
  breederId: string;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Breeder, breeder => breeder.users)
  @JoinColumn({ name: 'breeder_id' })
  breeder: Breeder;
}
