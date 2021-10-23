import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCodeToBreeders1635009570256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeders', new TableColumn({
      name: 'code',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeders', 'code')
  }
}
