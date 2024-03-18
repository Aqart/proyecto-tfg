<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MaquinaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MaquinaRepository::class)]
#[ApiResource]
class Maquina
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nombre = null;

    #[ORM\Column(nullable: true)]
    private ?float $produccionM2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $energiaConsumida = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getProduccionM2(): ?float
    {
        return $this->produccionM2;
    }

    public function setProduccionM2(?float $produccionM2): static
    {
        $this->produccionM2 = $produccionM2;

        return $this;
    }

    public function getEnergiaConsimida(): ?float
    {
        return $this->energiaConsumida;
    }

    public function setEnergiaConsimida(?float $energiaConsumida): static
    {
        $this->energiaConsumida = $energiaConsumida;

        return $this;
    }
}
