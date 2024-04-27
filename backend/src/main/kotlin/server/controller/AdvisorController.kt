package server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.DTO.AdvisorDTO
import server.entity.Advisor
import server.entity.Client
import server.entity.SecurityCategory
import server.service.AdvisorService
import server.service.ClientService
import server.service.TransactionService
import server.utils.toAdvisorDTO
import java.time.DayOfWeek
import java.time.Month
import java.util.*


@RestController
@RequestMapping("/api/advisors")
class AdvisorController(
    private val advisorService: AdvisorService,
    private val clientService: ClientService,
    private val transactionService: TransactionService
) {
    @GetMapping
    fun getAdvisors(): List<Advisor>? = advisorService.getAllAdvisors()

    @GetMapping("/{id}")
    fun getAdvisorById(@PathVariable("id") advisorId: UUID): AdvisorDTO =
        advisorService.getAdvisorById(advisorId).toAdvisorDTO()

    @GetMapping("/{id}/clients")
    fun getClientsByAdvisorId(@PathVariable("id") advisorId: UUID): List<Client>? =
        clientService.getClientsByAdvisorId(advisorId)

    @GetMapping("/{id}/profit-loss")
    fun getTotalSecurities(@PathVariable("id") advisorId: UUID): Float? =
        advisorService.getAdvisorProfitLoss(advisorId)

    @GetMapping("{advisorId}/total-category/{category}")
    fun getTotalByCategory(
        @PathVariable("advisorId") advisorId: UUID,
        @PathVariable("category") category: SecurityCategory
    ): Number? = transactionService
        .getSecurityTotalByCategoryByAdvisorId(advisorId)[category]

    @GetMapping("/{advisorId}/total-category")
    fun getTotalForAllCategoriesByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<SecurityCategory, Float> =
        transactionService.getSecurityTotalByCategoryByAdvisorId(advisorId)

    @GetMapping("/{advisorId}/weekly-summary")
    fun getWeeklyDailyTotalSecurityByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<DayOfWeek, Float> =
        transactionService.getWeeklySummarySecurityBoughtByAdvisor(advisorId)

    @GetMapping("/{advisorId}/monthly-summary")
    fun getMonthlySummarySecurityByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<Int, Float> =
        transactionService.getMonthlySummarySecurityBoughtByAdvisor(advisorId)

    @GetMapping("/{advisorId}/month-total")
    fun getMonthTotalSecurityByAdvisor(@PathVariable("advisorId") advisorId: UUID): Map<Month, Float> =
        transactionService.getMonthlyTotalSecurityBoughtByAdvisor(advisorId)
}