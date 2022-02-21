import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddForSaleToPoultries1645465247749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'poultries',
      new TableColumn({
        name: 'for_sale',
        type: 'boolean',
        default: false
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'for_sale')
  }
}
