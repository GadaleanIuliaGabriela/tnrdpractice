import {MigrationInterface, QueryRunner} from "typeorm";

export class Product1637936509958 implements MigrationInterface {
    name = 'Product1637936509958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` longtext NULL, \`currency\` enum ('EUR', 'USD', 'RON') NOT NULL DEFAULT 'EUR', \`price\` decimal NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_cbb5d890de1519efa20c42bcd52\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_cbb5d890de1519efa20c42bcd52\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
