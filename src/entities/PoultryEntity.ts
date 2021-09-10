
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { IPoultryAddress } from '@Types/poultry'

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
}
