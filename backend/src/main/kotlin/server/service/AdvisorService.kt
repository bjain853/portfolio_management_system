package server.service

import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import server.entity.Advisor
import server.entity.Portfolio
import server.repository.AdvisorRepository
import java.util.*

@Service
class AdvisorService(
    private val advisorRepository: AdvisorRepository,
    private val portfolioService: PortfolioService,
    private val securityService: SecurityService
) : UserDetailsService {

    fun getAdvisorById(id: UUID): Advisor = advisorRepository.getReferenceById(id)

    fun getAdvisorWithEmail(email: String): Advisor = advisorRepository.findByEmail(email)


    fun getAllPortfoliosProfitLoss(advisorId: UUID): Float? {
        val portfolios = portfolioService.getAllPortfoliosByAdvisor(advisorId)
        if(portfolios.isNullOrEmpty()) return 0F

        return portfolios.mapNotNull { portfolio: Portfolio -> portfolioService.getPortfolioProfit(portfolio.id) }
            .reduceRight { fl:Float?, acc:Float? -> acc?.plus(fl!!) }
    }

    fun advisorPortfolioTotalValue(advisorId: UUID): Float{
        val portfolios = portfolioService.getAllPortfoliosByAdvisor(advisorId)

        if(portfolios.isNullOrEmpty()) return 0F

        return portfolios
            .map{
                portfolio: Portfolio -> portfolioService.getPortfolioSecurityNames(portfolio.id)
                .map {
                    securityName: String -> portfolioService.
                        getPortfolioSecurityQuantityByName(portfolio.id,securityName)*
                        securityService.getLatestSecurityPriceByName(securityName)
                }.sum()
            }.sum()


    }

    fun save(advisor: Advisor): Advisor = advisorRepository.save(advisor)

    override fun loadUserByUsername(username: String?): Advisor? =
        advisorRepository.findAll().find { advisor: Advisor ->
            advisor.email == username
        }


}