import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddDewlapToPoultries1635006764290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'dewlap',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'dewlap')
  }
}
