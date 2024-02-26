package server.service

import org.springframework.stereotype.Service
import server.entity.Portfolio
import server.entity.Security
import server.repository.PortfolioRepository

@Service
class PortfolioService(private val portfolioRepository: PortfolioRepository)
{
    fun getAllPortfolios(): List<Portfolio> = portfolioRepository.findAll()

    fun getPortfolioById(id:Int) : Portfolio = portfolioRepository.getReferenceById(id)

    fun getTotalPortfolioSecurities(portfolio: Portfolio) : Float = portfolio.securities
        .map { security: Security -> security.quantity*security.purchasePrice }.sum()

}