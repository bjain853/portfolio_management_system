package server.DTO

import server.entity.SecurityCategory
import java.util.*

data class SecurityDTO(
    val id: UUID?,
    val name: String,
    val category: SecurityCategory,
    val purchasePrice: Float,
    val quantity: Float,
    val portfolioId: UUID,
)
