import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRegisterFiles1635204551973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'register_files',
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
          name: 'register_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'file_name',
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
    
    await queryRunner.createForeignKey('register_files', new TableForeignKey({
      columnNames: ['register_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'registers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('register_files')
  }
}
