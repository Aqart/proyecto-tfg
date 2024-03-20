<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240320181513 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE gasto_general_maquina (gasto_general_id INT NOT NULL, maquina_id INT NOT NULL, INDEX IDX_E7EDB15BBD6D563C (gasto_general_id), INDEX IDX_E7EDB15B41420729 (maquina_id), PRIMARY KEY(gasto_general_id, maquina_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gasto_general_maquina ADD CONSTRAINT FK_E7EDB15BBD6D563C FOREIGN KEY (gasto_general_id) REFERENCES gasto_general (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gasto_general_maquina ADD CONSTRAINT FK_E7EDB15B41420729 FOREIGN KEY (maquina_id) REFERENCES maquina (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gasto_general_maquina DROP FOREIGN KEY FK_E7EDB15BBD6D563C');
        $this->addSql('ALTER TABLE gasto_general_maquina DROP FOREIGN KEY FK_E7EDB15B41420729');
        $this->addSql('DROP TABLE gasto_general_maquina');
    }
}
