
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Register from './RegisterEntity'

@Entity('register_files')
export default class RegisterFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'register_id'})
  registerId: string;

  @Column({ type: 'varchar', name: 'file_name' })
  fileName: string;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Register, poultry => poultry.files)
  @JoinColumn({ name: 'register_id' })
  register: Register;
}
