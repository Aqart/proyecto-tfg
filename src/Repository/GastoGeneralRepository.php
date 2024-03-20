<?php

namespace App\Repository;

use App\Entity\GastoGeneral;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GastoGeneral>
 *
 * @method GastoGeneral|null find($id, $lockMode = null, $lockVersion = null)
 * @method GastoGeneral|null findOneBy(array $criteria, array $orderBy = null)
 * @method GastoGeneral[]    findAll()
 * @method GastoGeneral[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GastoGeneralRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GastoGeneral::class);
    }

    //    /**
    //     * @return GastoGeneral[] Returns an array of GastoGeneral objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('g.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?GastoGeneral
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
