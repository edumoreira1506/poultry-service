import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePoultryImages1634766086291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'poultry_images',
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
          name: 'image_url',
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

    await queryRunner.createForeignKey('poultry_images', new TableForeignKey({
      columnNames: ['poultry_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'poultries',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('poultry_images')
  }
}
