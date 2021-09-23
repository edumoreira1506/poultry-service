
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPoultryAddress } from '@cig-platform/types'

import PoultryUser from './PoultryUserEntity'

@Entity('poultries')
export default class Poultry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('json')
  address: IPoultryAddress;

  @Column('varchar')
  description: string;

  @Column('boolean')
  active: boolean;

  @OneToMany(() => PoultryUser, poultryUser => poultryUser.poultry)
  users: PoultryUser[];
}
