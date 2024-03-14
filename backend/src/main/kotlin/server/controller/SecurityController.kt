package server.controller

import org.springframework.web.bind.annotation.*
import server.DTO.SecurityDTO
import server.entity.Security
import server.entity.SecurityCategory
import server.service.SecurityService
import java.util.*


@RestController
@RequestMapping("/api/security")
class SecurityController(private val securityService: SecurityService) {

    @GetMapping("/{id}")
    fun getSecurityById(@PathVariable("id") id: UUID): Security? = securityService.getSecurityById(id)

    @GetMapping("/total/{advisorId}")
    fun getTotalSecurities(@PathVariable("advisorId") advisorId: UUID): Float =
        securityService.getTotalSecuritiesValueByAdvisorId(advisorId)

    @GetMapping("/total/{advisorId}/{category}")
    fun getTotalByCategory(
        @PathVariable("advisorId") advisorId: UUID,
        @PathVariable("category") category: SecurityCategory
    ): Number =
        securityService.getSecurityTotalByCategoryByAdvisorId(advisorId)[category]
            ?: 0.0

    @GetMapping("/{advisorId}/total-category")
    fun getTotalForAllCategories(@PathVariable("advisorId") advisorId: UUID): Map<SecurityCategory, Float> =
        securityService.getSecurityTotalByCategoryByAdvisorId(advisorId)

    @PostMapping
    fun addNewSecurity(@RequestBody securityInformation: SecurityDTO): Security =
        securityService.save(securityInformation)

    @PatchMapping
    fun updateSecurity(): SecurityDTO? {
        // TODO : implement
        return null
    }

}