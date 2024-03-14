package server.service

import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import server.entity.Advisor
import server.repository.AdvisorRepository
import java.util.*

@Service
class AdvisorService(private val advisorRepository: AdvisorRepository) : UserDetailsService {
    fun getAllAdvisors(): List<Advisor> = advisorRepository.findAll()

    fun getAdvisorById(id: UUID): Advisor = advisorRepository.getReferenceById(id)

    fun hasAdvisorWithEmail(email: String): Advisor? = advisorRepository.findByEmail(email)

    fun save(advisor: Advisor): Advisor = advisorRepository.save(advisor)
    override fun loadUserByUsername(username: String?): Advisor? =
        advisorRepository.findAll().find { advisor: Advisor ->
            advisor.email == username
        }


}