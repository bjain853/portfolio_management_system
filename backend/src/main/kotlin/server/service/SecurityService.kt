package server.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestBody
import server.DTO.SecurityDTO
import server.entity.Security
import server.entity.SecurityCategory
import server.repository.SecurityRepository
import java.util.*


@Service
class SecurityService(
    private val securityRepository: SecurityRepository, private val portfolioService: PortfolioService
) {
    fun getAllSecurityByAdvisorId(advisorId: UUID): List<Security> =
        securityRepository.findAll().filter { security -> security.portfolio.client.advisor.id == advisorId }

    fun getSecurityById(id: UUID): Security = securityRepository.getReferenceById(id)

    fun getTotalSecuritiesValueByAdvisorId(advisorId: UUID): Float =
        getAllSecurityByAdvisorId(advisorId).map { security -> security.quantity * security.purchasePrice }.sum()

    fun getSecurityTotalByCategoryByAdvisorId(advisorId: UUID): Map<SecurityCategory, Float> =
        getAllSecurityByAdvisorId(advisorId).groupingBy { element: Security -> element.category }
            .aggregate { _, accumulator: Float?, security, first ->
                if (first) security.purchasePrice * security.purchasePrice
                else accumulator ?: 0.plus((security.quantity * security.purchasePrice))
            }

    fun save(@RequestBody securityInformation: SecurityDTO): Security {
        val portfolio = portfolioService.getPortfolioById(securityInformation.portfolioId)
        val newSecurity = Security(
            portfolio = portfolio,
            name = securityInformation.name,
            category = securityInformation.category,
            quantity = securityInformation.quantity,
            purchasePrice = securityInformation.purchasePrice
        )
        return securityRepository.save(newSecurity)
    }
}