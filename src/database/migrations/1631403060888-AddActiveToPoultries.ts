import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddActiveToPoultries1631403060888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'active',
      type: 'boolean',
      default: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'active')
  }
}
