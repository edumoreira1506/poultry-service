import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddIsAliveToPoultries1654115842621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'poultries',
      new TableColumn({
        name: 'is_alive',
        type: 'bool',
        isNullable: true,
        default: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'is_alive')
  }
}
