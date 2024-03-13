package server.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.service.SecurityService

@RestController
@RequestMapping("/api/security")
class SecurityController(private val securityService: SecurityService) {

//    @GetMapping
//    fun getSecurities() : List<Security>? =  securityService.getAllSecurity()
//
//    @GetMapping("/{id}")
//    fun getSecurityById(@PathVariable("id") securityId: Int) : Security? = securityService.getSecurityById(securityId)
//
//    @GetMapping("/total")
//    fun getTotalSecurities() : Float = securityService.getTotalSecuritiesValue()
//
//    @GetMapping("/total/{category}")
//    fun getTotalByCategory(@PathVariable("category") category: SecurityCategory) : Number = securityService.
//    getSecurityTotalByCategory().get(category)
//        ?: 0.0
//
//    @GetMapping("/total-category")
//    fun getTotalForAllCategories() : Map<SecurityCategory,Float> = securityService.getSecurityTotalByCategory()


}