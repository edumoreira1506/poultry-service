
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'

import Breeder from './BreederEntity'
import PoultryImage from './PoultryImageEntity'

@Entity('poultries')
export default class Poultry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  dewlap: string;

  @Column('varchar')
  register: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  gender: string;

  @Column({ type: 'uuid', name: 'breeder_id'})
  breederId: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column('json')
  colors: IPoultryColors;

  @Column('json')
  videos: IPoultryVideos;

  @Column('boolean')
  active: boolean;

  @ManyToOne(() => Breeder, breeder => breeder.poultries)
  @JoinColumn({ name: 'breeder_id' })
  breeder: Breeder;

  @OneToMany(() => PoultryImage, poultryImage => poultryImage.poultry)
  images?: PoultryImage[];
}
