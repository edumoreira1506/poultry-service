import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddProfileImageUrlToBreeders1633130552888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeders', new TableColumn({
      name: 'profile_image_url',
      type: 'varchar',
      default: true
    }))
  }
        
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeders', 'profile_image_url')
  }
}
