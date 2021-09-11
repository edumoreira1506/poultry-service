import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePoultryUsers1631391552269 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'poultry_users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          isNullable: false,
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'poultry_id',
          type: 'uuid',
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey('poultry_users', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }))

    await queryRunner.createForeignKey('poultry_users', new TableForeignKey({
      columnNames: ['poultry_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'poultries',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('poultry_users')
  }
}
