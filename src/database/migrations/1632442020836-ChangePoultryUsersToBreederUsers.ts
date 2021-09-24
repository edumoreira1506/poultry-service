import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangePoultryUsersToBreederUsers1632442020836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('poultry_users', 'breeder_users')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('breeder_users', 'poultry_users')
  }
}
