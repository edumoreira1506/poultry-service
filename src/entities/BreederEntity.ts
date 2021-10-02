
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IBreederAddress } from '@cig-platform/types'

import BreederUser from './BreederUserEntity'

@Entity('breeders')
export default class Breeder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('json')
  address: IBreederAddress;

  @Column('varchar')
  description: string;

  @Column('boolean')
  active: boolean;

  @Column({ name: 'foundation_date', type: 'date' })
  foundationDate: Date;

  @Column({ name: 'profile_image_url', type: 'varchar' })
  profileImageUrl: string;

  @OneToMany(() => BreederUser, breederUser => breederUser.breeder)
  users?: BreederUser[];
}
