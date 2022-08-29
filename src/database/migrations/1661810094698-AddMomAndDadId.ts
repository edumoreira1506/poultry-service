import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddMomAndDadId1661810094698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'mom_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.addColumn('poultries', new TableColumn({
      name: 'dad_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('poultries', new TableForeignKey({
      columnNames: ['mom_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'poultries',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))

    await queryRunner.createForeignKey('poultries', new TableForeignKey({
      columnNames: ['dad_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'poultries',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('poultries', 'dad_id')
    await queryRunner.dropColumn('poultries', 'mom_id')
  }
}
