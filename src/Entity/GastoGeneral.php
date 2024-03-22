<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GastoGeneralRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: GastoGeneralRepository::class)]
#[ApiResource(
    shortName: "GastoGeneral",
    description: "Entidad gasto general",
    operations: [
        new Get(
            uriTemplate: "/gastogeneral/{id}",
        ),
        new GetCollection(
            uriTemplate: "/gastosgenerales",
        ),
        new Post(
            uriTemplate: "/gastogeneral",
        ),
        new Put(
            uriTemplate: "/gastogeneral/{id}",
        ),
        new Delete(
            uriTemplate: "/gastogeneral/{id}",
        )
    ]
)]
class GastoGeneral
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nombre = null;

    #[ORM\Column(nullable: true)]
    private ?float $precio = null;

    #[ORM\ManyToMany(targetEntity: Maquina::class, inversedBy: 'gastoGeneral')]
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
