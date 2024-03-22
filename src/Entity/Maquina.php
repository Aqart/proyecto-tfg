<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MaquinaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: MaquinaRepository::class)]
#[ApiResource(
    shortName: "Maquina",
    description: "Entidad maquina",
    operations: [
        new Get(
            uriTemplate: "/maquina/{id}",
        ),
        new GetCollection(
            uriTemplate: "/maquinas",
        ),
        new Post(
            uriTemplate: "/maquina",
        ),
        new Put(
            uriTemplate: "/maquina/{id}",
        ),
        new Delete(
            uriTemplate: "/maquina/{id}",
        )
    ]
)]
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

    #[ORM\ManyToMany(targetEntity: GastoGeneral::class, mappedBy: 'Maquina')]
    private Collection $gastoGeneral;

    #[ORM\ManyToMany(targetEntity: Consumible::class, mappedBy: 'Maquina')]
    private Collection $consumible;

    #[ORM\ManyToMany(targetEntity: Trabajador::class, mappedBy: 'Maquina')]
    private Collection $trabajador;

    public function __construct()
    {
        $this->gastoGeneral = new ArrayCollection();
        $this->consumible = new ArrayCollection();
        $this->trabajador = new ArrayCollection();
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

    /**
     * @return Collection<int, GastoGeneral>
     */
    public function getGastoGeneral(): Collection
    {
        return $this->gastoGeneral;
    }

    public function addGastoGeneral(GastoGeneral $gastoGeneral): static
    {
        if (!$this->gastoGeneral->contains($gastoGeneral)) {
            $this->gastoGeneral->add($gastoGeneral);
            $gastoGeneral->addMaquina($this);
        }

        return $this;
    }

    public function removeGastoGeneral(GastoGeneral $gastoGeneral): static
    {
        if ($this->gastoGeneral->removeElement($gastoGeneral)) {
            $gastoGeneral->removeMaquina($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Consumible>
     */
    public function getConsumible(): Collection
    {
        return $this->consumible;
    }

    public function addConsumible(Consumible $consumible): static
    {
        if (!$this->consumible->contains($consumible)) {
            $this->consumible->add($consumible);
            $consumible->addMaquina($this);
        }

        return $this;
    }

    public function removeConsumible(Consumible $consumible): static
    {
        if ($this->consumible->removeElement($consumible)) {
            $consumible->removeMaquina($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Trabajador>
     */
    public function getTrabajador(): Collection
    {
        return $this->trabajador;
    }

    public function addTrabajador(Trabajador $trabajador): static
    {
        if (!$this->trabajador->contains($trabajador)) {
            $this->trabajador->add($trabajador);
            $trabajador->addMaquina($this);
        }

        return $this;
    }

    public function removeTrabajador(Trabajador $trabajador): static
    {
        if ($this->trabajador->removeElement($trabajador)) {
            $trabajador->removeMaquina($this);
        }

        return $this;
    }
}
