package server.service

import org.springframework.stereotype.Service
import server.entity.SecurityCategory
import server.entity.Transaction
import server.repository.TransactionRepository
import java.time.DayOfWeek
import java.time.LocalDateTime
import java.time.Month
import java.time.temporal.ChronoField
import java.util.*

@Service
class TransactionService(
    val transactionRepository: TransactionRepository,
    val securityService: SecurityService
) {
    fun getAllTransactionsByAdvisorId(advisorId: UUID): List<Transaction> =
        transactionRepository.findAll()
            .filter { transaction: Transaction -> transaction.portfolio.client?.advisor?.id == advisorId }

    fun getAllTransactionsByPortfolioId(portfolioId: UUID): List<Transaction> =
        transactionRepository.findAllByPortfolioId(portfolioId)

    fun getMonthlySummarySecurityBoughtByAdvisor(advisorId: UUID): Map<Int, Float> =
        getAllTransactionsByAdvisorId(advisorId)
            .filter { transaction: Transaction ->
                transaction.date.year == LocalDateTime.now().year &&
                        transaction.date.month == LocalDateTime.now().month
            }
            .groupingBy { transaction: Transaction -> transaction.date.dayOfMonth }
            .aggregate { _, accumulator: Float?, transaction, first ->
                if (first) transaction.price * transaction.quantity
                else accumulator ?: 0.plus((transaction.quantity * transaction.price))
            }

    fun getYearlyTotalSecurityBoughtByAdvisor(advisorId: UUID): Map<Int, Float> =
        getAllTransactionsByAdvisorId(advisorId)
            .filter { transaction: Transaction -> transaction.date.year == LocalDateTime.now().year }
            .groupingBy { transaction -> transaction.date.year }
            .aggregate { _, accumulator: Float?, transaction: Transaction, first: Boolean ->
                if (first) transaction.price * transaction.quantity
                else accumulator ?: 0.plus((transaction.quantity * transaction.price))
            }

    fun getWeeklySummarySecurityBoughtByAdvisor(advisorId: UUID): Map<DayOfWeek, Float> =
        getAllTransactionsByAdvisorId(advisorId)
            .filter { transaction: Transaction ->
                transaction.date.year == LocalDateTime.now().year && transaction.date.get(
                    ChronoField.ALIGNED_WEEK_OF_YEAR
                ) == LocalDateTime.now().get(ChronoField.ALIGNED_WEEK_OF_YEAR)
            }
            .groupingBy { transaction: Transaction -> transaction.date.dayOfWeek }
            .aggregate { _, accumulator: Float?, transaction, first ->
                if (first) transaction.quantity * transaction.price
                else accumulator ?: 0.plus((transaction.quantity * transaction.price))
            }

    fun getMonthlyTotalSecurityBoughtByAdvisor(advisorId: UUID): Map<Month, Float> =
        getAllTransactionsByAdvisorId(advisorId)
            .filter { transaction: Transaction ->
                transaction.date.year == LocalDateTime.now().year &&
                        transaction.date.month == LocalDateTime.now().month
            }
            .groupingBy { transaction -> transaction.date.month }
            .aggregate { _, accumulator: Float?, transaction: Transaction, first ->
                if (first) transaction.price * transaction.quantity
                else accumulator ?: 0.plus((transaction.quantity * transaction.price))
            }

    fun getSecurityTotalByCategoryByAdvisorId(advisorId: UUID): Map<SecurityCategory, Float> =
        getAllTransactionsByAdvisorId(advisorId).groupingBy { transaction: Transaction ->
            securityService.getSecurityCategoryByName(
                transaction.securityName
            )
        }
            .aggregate { _, accumulator: Float?, transaction, first ->
                if (first) transaction.quantity * transaction.price
                else accumulator ?: 0.plus((transaction.quantity * transaction.price))
            }

    fun save(transactionInformation: Transaction): Boolean {
        try {
            transactionRepository.save(transactionInformation)
            return true
        } catch (error: Exception) {
            return false
        }

    }


}