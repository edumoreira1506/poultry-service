import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTailToPoultries1635008076166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'tail',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'tail')
  }
}
