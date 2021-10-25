import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRegisters1635202653420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'registers',
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
          name: 'poultry_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'date',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'type',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'metadata',
          type: 'json',
          isNullable: true
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false
        }
      ]
    }), true)
    
    await queryRunner.createForeignKey('registers', new TableForeignKey({
      columnNames: ['poultry_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'poultries',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('registers')
  }
}
