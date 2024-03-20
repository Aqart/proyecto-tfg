<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240320182511 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE trabajador_maquina (trabajador_id INT NOT NULL, maquina_id INT NOT NULL, INDEX IDX_5BAEF7AEEC3656E (trabajador_id), INDEX IDX_5BAEF7AE41420729 (maquina_id), PRIMARY KEY(trabajador_id, maquina_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE trabajador_maquina ADD CONSTRAINT FK_5BAEF7AEEC3656E FOREIGN KEY (trabajador_id) REFERENCES trabajador (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trabajador_maquina ADD CONSTRAINT FK_5BAEF7AE41420729 FOREIGN KEY (maquina_id) REFERENCES maquina (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trabajador_maquina DROP FOREIGN KEY FK_5BAEF7AEEC3656E');
        $this->addSql('ALTER TABLE trabajador_maquina DROP FOREIGN KEY FK_5BAEF7AE41420729');
        $this->addSql('DROP TABLE trabajador_maquina');
    }
}
