<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240320180252 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE materia_prima (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(100) NOT NULL, coste_total DOUBLE PRECISION DEFAULT NULL, cantidad_m3 DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transporte_materia_prima (transporte_id INT NOT NULL, materia_prima_id INT NOT NULL, INDEX IDX_66BC5E924FC919A (transporte_id), INDEX IDX_66BC5E934282814 (materia_prima_id), PRIMARY KEY(transporte_id, materia_prima_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE transporte_materia_prima ADD CONSTRAINT FK_66BC5E924FC919A FOREIGN KEY (transporte_id) REFERENCES transporte (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE transporte_materia_prima ADD CONSTRAINT FK_66BC5E934282814 FOREIGN KEY (materia_prima_id) REFERENCES materia_prima (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transporte_materia_prima DROP FOREIGN KEY FK_66BC5E924FC919A');
        $this->addSql('ALTER TABLE transporte_materia_prima DROP FOREIGN KEY FK_66BC5E934282814');
        $this->addSql('DROP TABLE materia_prima');
        $this->addSql('DROP TABLE transporte_materia_prima');
    }
}
