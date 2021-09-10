import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePoultries1631237292933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
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
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'address',
          type: 'json',
          isNullable: true
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
      ]
    }), true)
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('poultries')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
