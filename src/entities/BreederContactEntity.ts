
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import {  } from '@cig-platform/types'
import Breeder from './BreederEntity'

@Entity('breeder_contacts')
export default class BreederContact {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'uuid', name: 'breeder_id'})
    breederId: string

  @Column('boolean')
    active: boolean

  @Column({ type: 'varchar', name: 'type' })
    type: string

  @Column('varchar')
    value: string

  @ManyToOne(() => Breeder, breeder => breeder.contacts)
  @JoinColumn({ name: 'breeder_id' })
    breeder: Breeder
    
  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}
