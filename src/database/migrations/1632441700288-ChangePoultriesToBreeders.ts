import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangePoultriesToBreeders1632441700288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('poultries', 'breeders')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('breeders', 'poultries')
  }
}
