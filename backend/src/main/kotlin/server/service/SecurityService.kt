package server.service

import org.springframework.stereotype.Service
import server.entity.Security
import server.entity.SecurityCategory
import server.repository.SecurityRepository
import java.util.*


@Service
class SecurityService(
    private val securityRepository: SecurityRepository,
) {


    fun getSecurityById(id: UUID): Security = securityRepository.getReferenceById(id)

    fun getLatestSecurityPriceByName(name: String): Float = securityRepository.getLatestSecurityAdjCloseByName(name) ?: 0F

    fun getSecurityNamesByCategory(securityCategory: SecurityCategory): List<String> {
        return securityRepository.findDistinctNameByCategory(securityCategory)
    }


    fun getSecurityCategoryByName(name: String): SecurityCategory = securityRepository.findCategoryByName(name)
}