package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Advisor
import java.util.*

@Repository
interface AdvisorRepository : JpaRepository<Advisor, UUID> {
    fun findByEmail(email: String): Advisor?


}