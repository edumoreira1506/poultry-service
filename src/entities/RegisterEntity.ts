
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import Poultry from './PoultryEntity'
import RegisterFile from './RegisterFileEntity'

@Entity('registers')
export default class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'poultry_id'})
  poultryId: string;

  @Column('varchar')
  description: string;

  @Column('json')
  metadata: Record<string, any>;
  
  @Column('timestamp')
  date: Date;

  @Column('varchar')
  type: string;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Poultry, poultry => poultry.registers)
  @JoinColumn({ name: 'poultry_id' })
  poultry: Poultry;

  @OneToMany(() => RegisterFile, registerFile => registerFile.register)
  files?: RegisterFile[];
}
