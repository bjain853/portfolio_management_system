package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Security
import server.entity.SecurityCategory
import java.util.*

@Repository
interface SecurityRepository : JpaRepository<Security, UUID> {
    fun getLatestSecurityAdjCloseByName(securityName: String): Float

    fun getDistinctNameByCategory(securityCategory: SecurityCategory): List<String>

    fun getCategoryByName(security_name: String): SecurityCategory
}