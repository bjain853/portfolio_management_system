package server.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import server.entity.Security
import server.entity.SecurityCategory
import server.repository.SecurityRepository

@Service
@CrossOrigin
class SecurityService(private val securityRepository: SecurityRepository)
{
    fun getAllSecurity(): List<Security> = securityRepository.findAll()

    fun getSecurityById(id:Int) : Security = securityRepository.getReferenceById(id)

    fun getTotalSecuritiesValue() : Float = securityRepository.findAll().
    map{security -> security.quantity * security.purchasePrice}.
    sum()

    fun getSecurityTotalByCategory() : Map<SecurityCategory,Float> = securityRepository.findAll().groupingBy { element : Security -> element.category }.
                                                aggregate { _, accumulator: Float?, security, first ->
                                                            if(first) security.purchasePrice*security.purchasePrice
                                                            else accumulator?:0.plus((security.quantity*security.purchasePrice))
                                                }

}