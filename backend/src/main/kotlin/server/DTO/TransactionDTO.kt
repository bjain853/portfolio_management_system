package server.DTO

import server.entity.TransactionType
import java.util.*

data class TransactionDTO(
    val security_name: String,
    val price: Float,
    val quantity: Float,
    val transactionType: TransactionType,
    val portfolioId: UUID?
)
