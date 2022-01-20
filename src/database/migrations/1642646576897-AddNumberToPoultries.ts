import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNumberToPoultries1642646576897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'number',
      type: 'int',
      isGenerated: true,
      generationStrategy: 'increment',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'number')
  }
}
