import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1692234242505 implements MigrationInterface {
  name = 'Initial1692234242505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movie_ratings\` (\`id\` int NOT NULL, \`rating\` float NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_notes\` (\`id\` int NOT NULL, \`note\` text NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`adm_users\` (\`id\` varchar(36) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`email\` varchar(80) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_f06882b56687f750915615ba06\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_favorites\` (\`id\` int NOT NULL, \`status\` enum ('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE', \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_a8856cf3416814c68d1b57fa23a\` FOREIGN KEY (\`user_id\`) REFERENCES \`adm_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_notes\` ADD CONSTRAINT \`FK_7d406c88afd3c324c3a2f9b945e\` FOREIGN KEY (\`user_id\`) REFERENCES \`adm_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_favorites\` ADD CONSTRAINT \`FK_da5c54b89910cb3163bbd8c00e3\` FOREIGN KEY (\`user_id\`) REFERENCES \`adm_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie_favorites\` DROP FOREIGN KEY \`FK_da5c54b89910cb3163bbd8c00e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_notes\` DROP FOREIGN KEY \`FK_7d406c88afd3c324c3a2f9b945e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_a8856cf3416814c68d1b57fa23a\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_favorites\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f06882b56687f750915615ba06\` ON \`adm_users\``,
    );
    await queryRunner.query(`DROP TABLE \`adm_users\``);
    await queryRunner.query(`DROP TABLE \`movie_notes\``);
    await queryRunner.query(`DROP TABLE \`movie_ratings\``);
  }
}
