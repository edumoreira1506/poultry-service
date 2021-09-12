
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IPoultryAddress } from '@cig-platform/core'

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
}
