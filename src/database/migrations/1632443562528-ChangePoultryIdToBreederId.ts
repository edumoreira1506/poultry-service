import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangePoultryIdToBreederId1632443562528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('breeder_users', 'poultry_id', 'breeder_id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('breeder_users', 'breeder_id', 'poultry_id')
  }
}
