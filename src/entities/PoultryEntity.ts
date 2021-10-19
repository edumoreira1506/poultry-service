
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'

import Breeder from './BreederEntity'

@Entity('poultries')
export default class Poultry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: string;

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
}
