import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateBreederContacts1634686840850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'breeder_contacts',
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
          name: 'breeder_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'type',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'value',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey('breeder_contacts', new TableForeignKey({
      columnNames: ['breeder_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'breeders',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('breeder_contacts')
  }
}
