package server.controller

import org.springframework.web.bind.annotation.*
import server.DTO.SecurityDTO
import server.entity.Security
import server.entity.SecurityCategory
import server.service.SecurityService
import java.time.DayOfWeek
import java.time.Month
import java.util.*


@RestController
@RequestMapping("/api/security")
class SecurityController(private val securityService: SecurityService) {

    @GetMapping("/categories")
    fun getSecurityCategories(): List<SecurityCategory> = SecurityCategory.entries.toList()

    @GetMapping("/{id}")
    fun getSecurityById(@PathVariable("id") id: UUID): Security? = securityService.getSecurityById(id)

    @GetMapping("/{advisorId}/total")
    fun getTotalSecurities(@PathVariable("advisorId") advisorId: UUID): Float =
        securityService.getTotalSecuritiesValueByAdvisorId(advisorId)

    @GetMapping("{advisorId}/total/{category}")
    fun getTotalByCategory(
        @PathVariable("advisorId") advisorId: UUID,
        @PathVariable("category") category: SecurityCategory
    ): Number? =
        securityService.getSecurityTotalByCategoryByAdvisorId(advisorId)[category]

    @GetMapping("/{advisorId}/total-category")
    fun getTotalForAllCategoriesByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<SecurityCategory, Float> =
        securityService.getSecurityTotalByCategoryByAdvisorId(advisorId)

    // Daily Total Security Values
    @GetMapping("/{advisorId}/monthly-total")
    fun getMonthlyTotalSecurityByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<Month, Float> =
        securityService.getMonthlyTotalSecurityByAdvisor(advisorId)

    @GetMapping("/{advisorId}/weekly-total")
    fun getWeeklyDailyTotalSecurityByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<DayOfWeek, Float> =
        securityService.getWeeklyTotalSecurityByAdvisor(advisorId)

    // TODO: Implement table with current prices
    // TODO: Total Return
    // TODO: Sharpe Ratio
    // TODO: R-Squared

    @PostMapping
    fun addNewSecurity(@RequestBody securityInformation: SecurityDTO): Security =
        securityService.save(securityInformation)

    @PatchMapping
    fun updateSecurity(): SecurityDTO? {
        // TODO : implement
        return null
    }

}