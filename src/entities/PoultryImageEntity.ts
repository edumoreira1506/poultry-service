
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Poultry from './PoultryEntity'

@Entity('poultry_images')
export default class PoultryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'poultry_id'})
  poultryId: string;

  @Column('boolean')
  active: boolean;

  @Column({ type: 'varchar', name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Poultry, poultry => poultry.images)
  @JoinColumn({ name: 'poultry_id' })
  poultry: Poultry;
}
