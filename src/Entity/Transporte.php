<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TransporteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: TransporteRepository::class)]
#[ApiResource(
    shortName: "Transporte",
    description: "Entidad transporte",
    operations: [
        new Get(
            uriTemplate: "/transporte/{id}",
        ),
        new GetCollection(
            uriTemplate: "/transportes",
        ),
        new Post(
            uriTemplate: "/transporte",
        ),
        new Put(
            uriTemplate: "/transporte/{id}",
        ),
        new Delete(
            uriTemplate: "/transporte/{id}",
        )
    ]
)]
class Transporte
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nombre = null;

    #[ORM\Column(nullable: true)]
    private ?int $unidadesMes = null;

    #[ORM\Column(nullable: true)]
    private ?float $precio = null;

    #[ORM\ManyToMany(targetEntity: MateriaPrima::class, inversedBy: 'transporte')]
    private Collection $MateriaPrima;

    public function __construct()
    {
        $this->MateriaPrima = new ArrayCollection();
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

    public function getUnidadesMes(): ?int
    {
        return $this->unidadesMes;
    }

    public function setUnidadesMes(?int $unidadesMes): static
    {
        $this->unidadesMes = $unidadesMes;

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

    /**
     * @return Collection<int, MateriaPrima>
     */
    public function getMateriaPrima(): Collection
    {
        return $this->MateriaPrima;
    }

    public function addMateriaPrima(MateriaPrima $materiaPrima): static
    {
        if (!$this->MateriaPrima->contains($materiaPrima)) {
            $this->MateriaPrima->add($materiaPrima);
        }

        return $this;
    }

    public function removeMateriaPrima(MateriaPrima $materiaPrima): static
    {
        $this->MateriaPrima->removeElement($materiaPrima);

        return $this;
    }
}
