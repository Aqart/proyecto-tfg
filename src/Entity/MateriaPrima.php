<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MateriaPrimaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;


#[ORM\Entity(repositoryClass: MateriaPrimaRepository::class)]
#[ApiResource(
    shortName: "MateriaPrima",
    description: "Entidad materia prima",
    operations: [
        new Get(
            uriTemplate: "/materiaprima/{id}",
        ),
        new GetCollection(
            uriTemplate: "/materiasprimas",
        ),
        new Post(
            uriTemplate: "/materiaprima",
        ),
        new Put(
            uriTemplate: "/materiaprima/{id}",
        ),
        new Delete(
            uriTemplate: "/materiaprima/{id}",
        )
    ]
)]
class MateriaPrima
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nombre = null;

    #[ORM\Column(nullable: true)]
    private ?float $costeTotal = null;

    #[ORM\Column(nullable: true)]
    private ?float $cantidadM3 = null;

    #[ORM\ManyToMany(targetEntity: Transporte::class, mappedBy: 'MateriaPrima')]
    private Collection $transporte;

    public function __construct()
    {
        $this->transporte = new ArrayCollection();
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

    public function getCosteTotal(): ?float
    {
        return $this->costeTotal;
    }

    public function setCosteTotal(?float $costeTotal): static
    {
        $this->costeTotal = $costeTotal;

        return $this;
    }

    public function getCantidadM3(): ?float
    {
        return $this->cantidadM3;
    }

    public function setCantidadM3(?float $cantidadM3): static
    {
        $this->cantidadM3 = $cantidadM3;

        return $this;
    }

    /**
     * @return Collection<int, Transporte>
     */
    public function getTransporte(): Collection
    {
        return $this->transporte;
    }

    public function addTransporte(Transporte $transporte): static
    {
        if (!$this->transporte->contains($transporte)) {
            $this->transporte->add($transporte);
            $transporte->addMateriaPrima($this);
        }

        return $this;
    }

    public function removeTransporte(Transporte $transporte): static
    {
        if ($this->transporte->removeElement($transporte)) {
            $transporte->removeMateriaPrima($this);
        }

        return $this;
    }
}
