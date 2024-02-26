package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Advisor

@Repository
interface AdvisorRepository : JpaRepository<Advisor,Int>