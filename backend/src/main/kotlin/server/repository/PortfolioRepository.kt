package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Client
import server.entity.Portfolio
import java.util.*

@Repository
interface PortfolioRepository : JpaRepository<Portfolio, UUID> {
    fun findByClient(client: Client): Portfolio?
}