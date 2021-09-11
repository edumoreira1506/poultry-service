
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
