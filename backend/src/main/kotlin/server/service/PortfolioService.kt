package server.service

import org.springframework.stereotype.Service
import server.DTO.TransactionDTO
import server.entity.Client
import server.entity.Portfolio
import server.entity.Transaction
import server.repository.PortfolioRepository
import java.util.*


@Service
class PortfolioService(
    private val portfolioRepository: PortfolioRepository,
    private val transactionService: TransactionService,
) {
    fun getAllPortfolios(): List<Portfolio> = portfolioRepository.findAll()


    fun getPortfolioById(id: UUID): Portfolio = portfolioRepository.getReferenceById(id)

    fun getPortfolioByClient(client: Client): Portfolio? {
        return portfolioRepository.findByClient(client)
    }

    fun getAllPortfoliosByAdvisor(advisorId: UUID) : List<Portfolio>? {
        return portfolioRepository.findAll().filter { portfolio: Portfolio? ->
            portfolio?.client?.advisor?.id == advisorId }
    }

    fun getPortfolioProfitBySecurityName(portfolioId: UUID,securityName: String): Float = portfolioRepository.
    getPortfolioProfitBySecurityName(portfolioId.toString(),securityName) ?: 0F


    fun getPortfolioSecurityNames(portfolioId: UUID) : List<String> = portfolioRepository.
    findSecurityNamesById(portfolioId.toString())

    fun getPortfolioSecurityQuantityByName(portfolioId: UUID,securityName:String) : Float = portfolioRepository.
    getSecurityQuantityByName(portfolioId.toString(), securityName) ?: 0F

    fun getPortfolioProfit(portfolioId: UUID) : Float? = portfolioRepository.findPortfolioProfit(portfolioId.toString())

    fun addNewTransaction(portfolioId: UUID, transactionInformation: TransactionDTO): Boolean {
        try {
            val portfolio: Optional<Portfolio> = portfolioRepository.findById(portfolioId)
            if (portfolio.isPresent) {
                val transaction = Transaction(
                    transactionType = transactionInformation.transactionType,
                    securityName = transactionInformation.securityName,
                    price = transactionInformation.price,
                    quantity = transactionInformation.quantity,
                    portfolio = portfolio.get()
                )
                transactionService.save(transaction)
            }
        } catch (e: Exception) {
            return false
        }
        return true
    }

    fun save(portfolio: Portfolio): Portfolio {
        return portfolioRepository.save(portfolio)
    }
}