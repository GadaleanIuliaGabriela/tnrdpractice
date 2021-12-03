import {MigrationInterface, QueryRunner} from "typeorm";

export class Product1638542499022 implements MigrationInterface {
    name = 'Product1638542499022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`price\` \`price\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`price\` \`price\` decimal(10,0) NULL`);
    }

}
