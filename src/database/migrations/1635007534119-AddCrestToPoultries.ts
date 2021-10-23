import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCrestToPoultries1635007534119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'crest',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'crest')
  }
}
