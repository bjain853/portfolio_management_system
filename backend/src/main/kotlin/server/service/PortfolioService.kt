package server.service

import org.springframework.stereotype.Service
import server.entity.Portfolio
import server.entity.Security
import server.repository.PortfolioRepository
import java.util.*

@Service
class PortfolioService(private val portfolioRepository: PortfolioRepository, private val clientService: ClientService) {
    fun getAllPortfolios(): List<Portfolio> = portfolioRepository.findAll()

    fun getPortfolioById(id: UUID): Portfolio = portfolioRepository.getReferenceById(id)

    fun getTotalPortfolioSecurities(portfolio: Portfolio): Float = portfolio.securities
        .map { security: Security -> security.quantity * security.purchasePrice }.sum()

    fun getPortfolioByClientId(clientId: UUID): Portfolio? {
        val client = clientService.getClientById(clientId)
        return if (client != null) portfolioRepository.findPortfolioByClient(client)
        else null
    }

}