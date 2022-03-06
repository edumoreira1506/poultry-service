
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import Breeder from './BreederEntity'

@Entity('breeder_images')
export default class BreederImage {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'uuid', name: 'breeder_id'})
    breederId: string

  @Column('boolean')
    active: boolean

  @Column({ type: 'varchar', name: 'image_url' })
    imageUrl: string

  @ManyToOne(() => Breeder, breeder => breeder.images)
  @JoinColumn({ name: 'breeder_id' })
    breeder: Breeder
}
