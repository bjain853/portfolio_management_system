package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import server.entity.Security
import server.entity.SecurityCategory
import java.util.*

@Repository
interface SecurityRepository : JpaRepository<Security, UUID> {
    @Query("select max(s.adj_close) from Security s group by s.name having s.name=?1")
    fun getLatestSecurityAdjCloseByName(securityName: String): Float

    @Query("select distinct s.name from Security s where s.category = ?1")
    fun findDistinctNameByCategory(securityCategory: SecurityCategory): List<String>

    @Query("select s.category from Security s where s.name =?1")
    fun findCategoryByName(securityName: String): SecurityCategory
}