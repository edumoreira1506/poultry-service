import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddGenderCategoryToPoultries1636236915405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'gender_category',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'gender_category')
  }
}
