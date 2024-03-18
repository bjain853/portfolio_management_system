package server.service

import org.springframework.stereotype.Service
import server.entity.Client
import server.entity.Portfolio
import server.entity.Security
import server.repository.PortfolioRepository
import java.time.LocalDateTime
import java.util.*

data class PortfolioInformation(
    val clientId: UUID
)

@Service
class PortfolioService(
    private val portfolioRepository: PortfolioRepository
) {
    fun getAllPortfolios(): List<Portfolio> = portfolioRepository.findAll()

    fun getPortfolioById(id: UUID): Portfolio = portfolioRepository.getReferenceById(id)

    fun getTotalPortfolioSecurities(portfolio: Portfolio): Float = portfolio.securities
        .map { security: Security -> security.quantity * security.purchasePrice }.sum()

    fun getPortfolioByClient(client: Client): Portfolio? {
        return portfolioRepository.findByClient(client)
    }

    fun save(client: Client): Portfolio? {
        val newPortfolio = Portfolio(
            client = client,
            clientEnrollmentDate = LocalDateTime.now(),
            securities = listOf(),
        )
        return portfolioRepository.save(newPortfolio)
    }
}