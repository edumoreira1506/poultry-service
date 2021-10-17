import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePoultries1634506108036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'poultries',
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
          name: 'type',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'birth_date',
          type: 'date',
          isNullable: true
        },
        {
          name: 'colors',
          type: 'json',
          isNullable: true,
        },
        {
          name: 'videos',
          type: 'json',
          isNullable: true
        },
        {
          name: 'breeder_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey('poultries', new TableForeignKey({
      columnNames: ['breeder_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'breeders',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('poultries')
  }
}
