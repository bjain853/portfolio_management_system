package server.service

import org.springframework.stereotype.Service
import server.DTO.TransactionDTO
import server.entity.Client
import server.entity.Portfolio
import server.entity.Transaction
import server.entity.TransactionType
import server.repository.PortfolioRepository
import java.time.LocalDateTime
import java.util.*


@Service
class PortfolioService(
    private val portfolioRepository: PortfolioRepository,
    private val transactionService: TransactionService,
    private val securityService: SecurityService
) {
    fun getAllPortfolios(): List<Portfolio> = portfolioRepository.findAll()

    fun getPortfolioById(id: UUID): Portfolio = portfolioRepository.getReferenceById(id)


    fun getPortfolioByClient(client: Client): Portfolio? {
        return portfolioRepository.findByClient(client)
    }

    fun getTotalProfitLossForEachSecurityName(portfolioId: UUID): Map<String, Float?> =
        transactionService.getAllTransactionsByPortfolioId(portfolioId)
            .filter { transaction: Transaction -> transaction.transactionType == TransactionType.SELL } // ProfitLoss only for sold securities
            .groupingBy { transaction: Transaction -> transaction.security_name }
            .aggregate { _, accumulator: Float?, transaction, first ->
                if (first) (securityService.getLatestSecurityPriceByName(transaction.security_name) - transaction.price) * transaction.quantity
                else accumulator?.plus((securityService.getLatestSecurityPriceByName(transaction.security_name) - transaction.price) * transaction.quantity)
            }

    fun getTotalProfitLossForPorfolio(portfolioId: UUID): Float? {
        val profitLossBySecurity = getTotalProfitLossForEachSecurityName(portfolioId)
        var totalProfitLoss: Float = 0.0F
        profitLossBySecurity.forEach { e ->
            totalProfitLoss += e.value!!
        }
        return totalProfitLoss
    }

    fun addNewTransaction(portfolioId: UUID, transactionInformation: TransactionDTO): Boolean {
        try {
            val portfolio: Optional<Portfolio> = portfolioRepository.findById(portfolioId)
            if (portfolio.isPresent) {
                val transaction = Transaction(
                    transactionType = transactionInformation.transactionType,
                    security_name = transactionInformation.security_name,
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

    fun save(client: Client): Portfolio {
        val newPortfolio = Portfolio(
            client = client,
            clientEnrollmentDate = LocalDateTime.now(),
            transactions = listOf(),
        )
        return portfolioRepository.save(newPortfolio)
    }
}