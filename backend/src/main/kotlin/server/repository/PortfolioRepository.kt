package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import server.entity.Client
import server.entity.Portfolio
import server.entity.Transaction
import java.util.*

@Repository
interface PortfolioRepository : JpaRepository<Portfolio, UUID> {

    fun findByClient(client: Client): Portfolio?

    @Query("SELECT DISTINCT security_name FROM portfolio p , transactions t WHERE p.id = ?1 AND t.portfolio_id = p.id",
        nativeQuery = true)
    fun findSecurityNamesById(portfolioId:String) : List<String>

    @Query("SELECT t FROM transactions t WHERE t.portfolio_id = ?1 AND t.security_name = ?2", nativeQuery = true)
    fun findPortfolioTransactionsBySecurityName(portfolioId: String,securityName:String) : List<Transaction>

    @Query("""SELECT SUM(
	            CASE 
                WHEN transaction_type = "BUY" THEN -quantity*price
                ELSE quantity*price
                END) from transactions t GROUP BY portfolio_id HAVING portfolio_id = ?1""", nativeQuery = true)
    fun findPortfolioProfit(portfolioId: String) : Float?

    @Query("""SELECT SUM(
	            CASE 
                WHEN transaction_type = "BUY" THEN quantity
                ELSE -quantity
                END) from transactions t WHERE portfolio_id = ?1 AND security_name =?2""",
            nativeQuery = true)
    fun getSecurityQuantityByName(portfolioId: String,securityName: String) : Float?

    @Query("""SELECT SUM(
	            CASE 
                WHEN transaction_type = "BUY" THEN -price*quantity
                ELSE price*quantity
                END) from transactions t GROUP BY portfolio_id HAVING portfolio_id = ?1 AND security_name =?2""",
        nativeQuery = true)
    fun getPortfolioProfitBySecurityName(portfolioId: String,securityName: String): Float?
}