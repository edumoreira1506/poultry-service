import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddRegisterToPoultries1635004925010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'register',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'register')
  }
}
