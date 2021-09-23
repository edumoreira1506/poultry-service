import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFoundationDateToPoultries1632438946640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'foundation_date',
      type: 'date',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'foundation_date')
  }
}
