
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Poultry from './PoultryEntity'

@Entity('registers')
export default class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'poultry_id'})
  poultryId: string;

  @Column('varchar')
  description: string;

  @Column('timestamp')
  date: Date;

  @Column('varchar')
  type: string;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Poultry, poultry => poultry.registers)
  @JoinColumn({ name: 'poultry_id' })
  poultry: Poultry;
}
