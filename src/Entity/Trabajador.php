<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\TrabajadorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: TrabajadorRepository::class)]
#[ApiResource(
    shortName: "Trabajador",
    description: "Entidad Trabajador",
    operations: [
        new Get(
            uriTemplate: "/trabajador/{id}",
        ),
        new GetCollection(
            uriTemplate: "/trabajadores",
        ),
        new Post(
            uriTemplate: "/trabajador",
        ),
        new Put(
            uriTemplate: "/trabajador/{id}",
        ),
        new Delete(
            uriTemplate: "/trabajador/{id}",
        )
    ]
)]
class Trabajador
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nombre = null;

    #[ORM\Column(length: 50)]
    private ?string $apellido1 = null;

    #[ORM\Column(length: 50)]
    private ?string $apellido2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $precio = null;

    #[ORM\Column(nullable: true)]
    private ?float $produccion = null;

    #[ORM\ManyToMany(targetEntity: Maquina::class, inversedBy: 'trabajador')]
    private Collection $Maquina;

    public function __construct()
    {
        $this->Maquina = new ArrayCollection();
    }

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

    public function getApellido1(): ?string
    {
        return $this->apellido1;
    }

    public function setApellido1(string $apellido1): static
    {
        $this->apellido1 = $apellido1;

        return $this;
    }

    public function getApellido2(): ?string
    {
        return $this->apellido2;
    }

    public function setApellido2(string $apellido2): static
    {
        $this->apellido2 = $apellido2;

        return $this;
    }

    public function getPrecio(): ?float
    {
        return $this->precio;
    }

    public function setPrecio(?float $precio): static
    {
        $this->precio = $precio;

        return $this;
    }

    public function getProduccion(): ?float
    {
        return $this->produccion;
    }

    public function setProduccion(?float $produccion): static
    {
        $this->produccion = $produccion;

        return $this;
    }

    /**
     * @return Collection<int, Maquina>
     */
    public function getMaquina(): Collection
    {
        return $this->Maquina;
    }

    public function addMaquina(Maquina $maquina): static
    {
        if (!$this->Maquina->contains($maquina)) {
            $this->Maquina->add($maquina);
        }

        return $this;
    }

    public function removeMaquina(Maquina $maquina): static
    {
        $this->Maquina->removeElement($maquina);

        return $this;
    }
}
