package server.service

import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import server.entity.Advisor
import server.repository.AdvisorRepository

@Service
@CrossOrigin
class AdvisorService(private val advisorRepository: AdvisorRepository) : UserDetailsService{
    fun getAllAdvisors(): List<Advisor> = advisorRepository.findAll()

    fun getAdvisorById(id:Int) : Advisor = advisorRepository.getReferenceById(id)
    override fun loadUserByUsername(username: String?): Advisor? = advisorRepository.findAll().find { advisor : Advisor ->
        advisor.username == username
    }

}