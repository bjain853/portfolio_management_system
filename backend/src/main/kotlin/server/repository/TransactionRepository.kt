package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Transaction
import java.util.*

@Repository
interface TransactionRepository : JpaRepository<Transaction, UUID> {
    fun findAllByPortfolioId(portfolioId: UUID): List<Transaction>
}