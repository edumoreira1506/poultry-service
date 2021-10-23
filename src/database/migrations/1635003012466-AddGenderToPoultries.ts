import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddGenderToPoultries1635003012466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'gender',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'gender')
  }
}
