import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCurrentAdvertisingPriceToPoultries1646346362803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'poultries',
      new TableColumn({
        name: 'current_advertising_price',
        type: 'int',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'current_advertising_price')
  }
}
