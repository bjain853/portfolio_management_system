package server.service

import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import server.entity.Advisor
import server.entity.Client
import server.repository.AdvisorRepository
import java.util.*

@Service
class AdvisorService(
    private val advisorRepository: AdvisorRepository,
    private val portfolioService: PortfolioService
) : UserDetailsService {
    fun getAllAdvisors(): List<Advisor> = advisorRepository.findAll()

    fun getAdvisorById(id: UUID): Advisor = advisorRepository.getReferenceById(id)

    fun getAdvisorWithEmail(email: String): Advisor? = advisorRepository.findByEmail(email)

    fun getAdvisorProfitLoss(advisorId: UUID): Float? =
        getAdvisorById(advisorId).clients!!.map { client: Client ->
            client.portfolio?.let {
                portfolioService.getTotalProfitLossForPorfolio(
                    it.id
                )
            }
        }
            .reduce { acc, gainValue ->
                acc!! + gainValue!!
            }

    fun save(advisor: Advisor): Advisor = advisorRepository.save(advisor)
    override fun loadUserByUsername(username: String?): Advisor? =
        advisorRepository.findAll().find { advisor: Advisor ->
            advisor.email == username
        }


}