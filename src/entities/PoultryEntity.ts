
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'

import Breeder from './BreederEntity'
import PoultryImage from './PoultryImageEntity'
import Register from './RegisterEntity'

@Entity('poultries')
export default class Poultry {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'bool', name: 'is_alive' })
    isAlive: boolean

  @Column('int')
    number: number

  @Column('varchar')
    description: string

  @Column('varchar')
    tail: string

  @Column('varchar')
    crest: string

  @Column('varchar')
    dewlap: string

  @Column('varchar')
    register: string

  @Column('varchar')
    name: string

  @Column('varchar')
    type: string

  @Column('varchar')
    gender: string

  @Column({ type: 'varchar', name: 'gender_category' })
    genderCategory: string

  @Column({ type: 'uuid', name: 'breeder_id'})
    breederId: string

  @Column({ type: 'uuid', name: 'mom_id'})
    momId: string

  @Column({ type: 'uuid', name: 'dad_id'})
    dadId: string

  @Column({ name: 'birth_date', type: 'date' })
    birthDate: Date

  @Column('json')
    colors: IPoultryColors

  @Column('json')
    videos: IPoultryVideos

  @Column({ name: 'for_sale', type: 'boolean' })
    forSale: boolean

  @Column('boolean')
    active: boolean

  @ManyToOne(() => Breeder, breeder => breeder.poultries)
  @JoinColumn({ name: 'breeder_id' })
    breeder: Breeder

  @OneToMany(() => Poultry, poultry => poultry.dad || poultry.mom)
    childrens?: Poultry[]

  @ManyToOne(() => Poultry, poultry => poultry.childrens)
  @JoinColumn({ name: 'dad_id' })
    dad: Poultry

  @ManyToOne(() => Poultry, poultry => poultry.childrens)
  @JoinColumn({ name: 'mom_id' })
    mom: Poultry

  @OneToMany(() => PoultryImage, poultryImage => poultryImage.poultry)
    images?: PoultryImage[]

  @OneToMany(() => Register, register => register.poultry)
    registers?: Register[]
}
